var Slide = React.createClass({
	getDefaultProps: function() {
		return {
			videoPreload: 'auto'
		};
	},

	componentWillMount: function() {
		var self = this;
		this.timer = setTimeout(
			self.props.onError,
			self.props.loadTimeout
		);
	},

	onLoad: function() {
		clearTimeout(this.timer);
		this.timer = null;

		this.props.onLoad();
	},

	reload: function() {
		this.props.reload();
	},

	getContent: function() {
		if (this.props.error)
			return <button key="error" type="button" className="retry" onClick={this.reload}>Try again</button>;

		//if (this.props.src.search(/$\.[mp4|ogv]/i) != -1)
		if (typeof this.props.src !== "string")
			return (
				<VideoJSComponent
					key="videojs"
					src={this.props.src}
					videoPreload={this.props.videoPreload}
					onLoad={this.onLoad}
					onError={this.props.onError}
					onEnd={this.props.onEnd}
					playPause={this.props.playPause}
				/>
			);

		if (this.props.src.search(/\.(png|jpg|jpeg|bmp)$/i) != -1) {
			return (
				<AnimatedImage
					key="animatedimage"
					src={this.props.src}
					animated={this.props.animated}
					loaded={this.props.loaded}
					onLoad={this.onLoad}
					onError={this.props.onError}
					onEnd={this.props.onEnd}
				/>
			);
		}
	},

	render: function() {
		return (
			<li className="slide">
				{this.getContent()}
			</li>
		);
	}

});