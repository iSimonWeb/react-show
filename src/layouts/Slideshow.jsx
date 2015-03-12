//var React = require('react');
//var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup.js');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

//var Slide = require('../components/Slide.jsx');

var Slideshow = React.createClass({
	getInitialState: function() {
		return {
			ready: false,
			loaded: false,
			error: false,
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

	onError: function() {
		this.setState({
			error: true
		});
	},

	gotoSlide: function(index) {
		this.setState({
			currentSlide: index,
			loaded: false,
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

	render: function() {
		var currentSlideData = this.state.slides[this.state.currentSlide],
			className = 'slideshow';

		if (this.state.ready)
			className += ' ready';
		if (this.state.error)
			className += ' error';
		else if (!this.state.loaded)
				className += ' loading';

		return (
			<div className={className}>
				<ReactCSSTransitionGroup component="ul" transitionName="slide" transitionAppear={true} transitionEnter={true} transitionLeave={true}>
					<Slide key={this.state.currentSlide + 'x' + this.state.retryCount}
						animated={this.props.animated}
						loaded={this.state.loaded}
						{...currentSlideData}
						reload={this.reload}
						onLoad={this.onLoad}
						onError={this.onError}
						onEnd={(this.state.autoPlay ? this.nextSlide : function(){})}
					/>
				</ReactCSSTransitionGroup>
				<DirectionNav prev={this.prevSlide} next={this.nextSlide} />
			</div>
		);
	}

});

//module.exports = Slideshow;