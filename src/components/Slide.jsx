//var React = require('react');

//var AnimatedImage = require('../atoms/AnimatedImage.jsx');

var ReactTransitionGroup = React.addons.TransitionGroup;


var Slide = React.createClass({
	getInitialState: function() {
		return {
			content: {},
			timeout: 10000
		};
	},

	getDefaultProps: function() {
		return {
			videoPreload: 'auto'
		};
	},

	componentDidMount: function() {
		this.setState({
			timer: setTimeout(this.onError, this.state.timeout)
		});

		this.setContent();
	},

	onLoad: function() {
		clearTimeout(this.state.timer);
		this.setState({
			loaded: true,
			timer: null
		});

		this.props.onLoad();
	},

	onError: function() {
		this.setState({
			error: true
		});

		this.props.onError();
	},

	reload: function() {
		this.props.reload();
	},

	setContent: function() {
		var content, isVideo;

		if (this.props.src.search(/\.(png|jpg|jpeg|bmp)$/i) != -1) {
			// Preload image
			var img = new Image();
			img.onload = this.onLoad;
			img.onerror = this.onError;
			img.src = this.props.src;
		}
		/*else if (this.props.src.search(/$\.[mp4|ogv]/i) != -1) {
				content = <VideoJSComponent src={this.props.src} videoPreload={this.props.videoPreload} onEnd={this.props.onReady} />;
			}*/
	},

	render: function() {
		return (
			<li className="slide">
				{(this.state.error
					? <button type="button" className="error timoout" onClick={this.reload}>Try again</button>
					: <AnimatedImage src={this.props.src} animated={this.props.animated} loaded={this.props.loaded} onEnd={this.props.onEnd} />
				)}
			</li>
		);
	}

});

//module.exports = Slide;