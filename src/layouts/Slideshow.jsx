var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var ReactTransitionGroup = React.addons.TransitionGroup;

var Slideshow = React.createClass({
	getInitialState: function() {
		return {
			ready: false,
			loaded: false,
			error: false,
			playing: this.props.autoPlay,
			retryCount: 1,
			retrying: false,
			currentSlide: 0,
			nextSlide: 1,
			slideCount: 0,
			slides: []
		};
	},

	getDefaultProps: function() {
		return {
			pagination: false,
			directionNav: true,
			autoPlay: true,
			animated: false,
			loadTimeout: 10000,
			slides: []
		};
	},

	componentWillMount: function() {
		this.setState({
			slides: this.props.slides,
			slideCount: this.props.slides.length,
			currentSlide: this.props.currentSlide || 0
		});
	},


	onLoad: function() {
		this.setState({
			ready: true,
			loaded: true,
			error: false
		});
	},

	//Retry download slide content
	// reset slideshow timer
	reload: function() {
		this.state.retrying = true;
		this.gotoSlide(this.state.currentSlide);
	},

	onError: function(type) {
		this.setState({
			error: true
		});
	},

	gotoSlide: function(index) {
		this.setState({
			currentSlide: index,
			loaded: false,
			playing: this.props.autoPlay,
			error: false,
			retrying: false,
			retryCount: 1 + this.state.retrying
		});
	},

	nextSlide: function() {
		this.gotoSlide((this.state.currentSlide + 1) % this.state.slideCount);
	},

	prevSlide: function() {
		this.gotoSlide(((this.state.currentSlide || this.state.slideCount) - 1) % this.state.slideCount);
	},

	playPause: function(pause) {
		this.setState({
			playing: (pause ? !pause : !this.state.playing)
		});
	},

	render: function() {
		var currentSlideData = this.state.slides[this.state.currentSlide],
			className = 'slideshow';

		if (this.state.ready) {
			className += ' ready';

			if (this.state.playing)
				className += ' playing';
			else
				className += ' paused';
		}
		if (this.state.error)
			className += ' error';
		else if (!this.state.loaded)
				className += ' loading';

		return (
			<div className={className}>
				<ReactCSSTransitionGroup component="ul" transitionName="slide" transitionAppear={true} transitionEnter={true} transitionLeave={true}>
					<Slide key={this.state.currentSlide + 'x' + this.state.retryCount}
						animated={this.props.animated}
						loadTimeout={this.props.loadTimeout}
						loaded={this.state.loaded}
						error={this.state.error}
						{...currentSlideData}
						reload={this.reload}
						playPause={this.playPause}
						onLoad={this.onLoad}
						onError={this.onError}
						onEnd={(this.props.autoPlay ? this.nextSlide : function(){})}
					/>
				</ReactCSSTransitionGroup>
				<DirectionNav prev={this.prevSlide} next={this.nextSlide} />
			</div>
		);
	}

});

//module.exports = Slideshow;