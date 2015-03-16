var VideoJSComponent = React.createClass({
	getInitialState: function() {
		return {
			preview: true,
			playing: false
		};
	},

	componentDidMount: function() {
		this.createVideo(this.props.src.preview);
	},

	switchVideo: function() {
		this.createVideo(this.props.src.full, true);
	},

	createVideo: function(sources, full) {
		var video = document.createElement('video');
		video.className = 'video-js vjs-default-skin';
		video.preload = this.props.videoPreload;
		
		if (full)
			video.setAttribute('controls', '');
		else if (this.props.src.poster)
				video.poster = this.props.src.poster;

		sources.forEach(function(source, index) {
			var sourceElement = document.createElement('source');
			sourceElement.src = source.url;
			sourceElement.type = source.type;

			video.appendChild(sourceElement);
		});
		
		this.refs.wrapper.getDOMNode().innerHTML = '';
		this.refs.wrapper.getDOMNode().appendChild(video);
		this.video = videojs(video);
		
		if (full)
			this.video.ready(this.onLoad);
		else
			this.video.on('loadedalldata', this.onLoad);
	},


	onLoad: function() {
		this.video.play();
		
		var self = this;

		this.video.on('play', function() {
			self.setState({
				playing: true
			});
		});
		this.video.on('pause', function() {
			self.setState({
				playing: false
			});
		});	

		this.video.on('error', this.props.onError);
		this.video.on('ended', this.onEnd);

		this.props.onLoad();
	},

	onEnd: function() {
		if (this.state.preview) {
			this.video.play();
			this.props.onEnd();
		} else {
			if (this.isMounted())
				return;

			this.setState({
				playing: false
			});
			this.video.currentTime(0);
		}
	},

	playPause: function(forcePlay) {
		var shouldPlay = forcePlay || !this.state.playing;

		this.props.playPause(true);

		this.setState({
			preview: false,
			playing: shouldPlay
		});

		if (this.state.preview)
			this.switchVideo();
		else
			this.video[shouldPlay ? 'play' : 'pause']();
	},

	render: function() {
		var className;
		if (this.state.preview) {
			className = 'preview';
		} else if (this.state.playing)
				className = 'full playing';
			else
				className = 'full paused';

		return (
			<span>
				<div ref="wrapper" className={className} />
				<button type="button" className="play-pause" onClick={this.playPause.bind(this, false)} />
			</span>
		);
	}

});