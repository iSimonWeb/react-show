var NO_EVENT_TIMEOUT = 15000;

var ImageComponent = React.createClass({
	getInitialState: function() {
		return {
			mounted: false,
			entering: false,
			entered: false
		};
	},

	componentDidMount: function() {
		this.setState({
			mounted: true
		});
	},

	componentWillEnter: function(animationEnd) {
		this.setState({
			entering: true
		});
		ReactTransitionEvents.addEndEventListener(
			this.getDOMNode(),
			animationEnd
		);
	},

	componentDidEnter: function() {
		this.setState({
			entered: true
		});
		this.props.onEnd();
	},

	render: function() {
		var className;
		if (this.state.mounted)
			className = 'image-enter';
		if (this.state.entering)
			className += ' image-enter-active';
		if (this.state.entered)
			className = '';

		return (
			<img key="image" src={this.props.src} className={className} />
		);
	}

});

var AnimatedImage = React.createClass({
	componentWillMount: function() {
		// Preload image
		this.img = new Image();
		this.img.onload = this.props.onLoad;
		this.img.onerror = this.props.onError;
		this.img.src = this.props.src;
	},

	render: function() {
		var image = (this.props.loaded ? <ImageComponent src={this.props.src} onEnd={this.props.onEnd} /> : []);

		return (
			<ReactTransitionGroup component="figure" transitionEnter={this.props.animated} transitionLeave={this.props.animated}>
				{image}
			</ReactTransitionGroup>
		);
	}

});