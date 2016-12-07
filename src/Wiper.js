import React, { Component } from 'react';

export default class Wiper extends Component {

	constructor() {
		super();
		this.state = {
			bothImagesLoaded: false
		}
	}

	componentDidMount() {

		this.bgImage = new Image();
		this.bgMist = new Image();
		let bgImageLoaded = false;
		let bgMistLoaded = false;

		this.bgImage.onload = () => {
			bgImageLoaded = true;
			if (bgImageLoaded && bgMistLoaded) {
				this.setState({bothImagesLoaded: true});
			}
		}

		this.bgMist.onload = () => {
			bgMistLoaded = true;
			if (bgImageLoaded && bgMistLoaded) {
				this.setState({bothImagesLoaded: true});
			}
		}

		this.bgImage.src = this.props.bgImage;
		this.bgMist.src = this.props.bgMist;

	}

	componentDidUpdate() {
		this.canvas = this.refs.myCanvas;
		this.ctx = this.canvas.getContext('2d');
		this.w = this.canvas.width;
		this.h = this.canvas.height;
		this.animationDone = false;
		// console.log('updated');
		// this.ctx.drawImage(this.bgMist,0,0,this.w,this.h);

		this.reRenderMist();
	}

	reRenderMist() {

		let alpha = 0;

		const animate = () => {
			this.animationDone = false;
			alpha += 0.02;
			this.ctx.globalAlpha = alpha;
			this.ctx.drawImage(this.bgMist,0,0,this.w,this.h);
			if (alpha >= 1) {
				// console.log('stop animation');
				this.animationDone = true;
				cancelAnimationFrame(this.animationRequest);
			} else {

				requestAnimationFrame(animate);
			}
		}

		this.animationRequest = requestAnimationFrame(animate);
		// console.log('rerender mist');

	}

	handelTouchMove(e) {
		clearTimeout(this.mistTimeout);
		if (this.state.bothImagesLoaded && this.animationDone) {

			const r = 20;

			for (var i = e.nativeEvent.touches.length - 1; i >= 0; i--) {
				// e.nativeEvent.touches[i]
				const { clientX, clientY } = e.nativeEvent.touches[i];
				this.ctx.globalCompositeOperation = 'destination-out';
				this.ctx.beginPath();
				this.ctx.arc(clientX,clientY, r, 0, 2*Math.PI);
				this.ctx.fill();
				this.ctx.globalCompositeOperation = 'source-over';
			}

		}
	}

	handelTouchEnd(e) {
		this.mistTimeout = setTimeout(this.reRenderMist.bind(this), 1000);
	}

	render() {
		const windowWidth = 360;

		const css = {
			canvas: {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%'
			},
			image: {
				width: '100%',
				height: 'auto',
				display: (this.state.bothImagesLoaded) ? 'block' : 'none'
			},
			wrapper: {
				position: 'relative'
			},
			loading: {
				width: windowWidth,
				height: windowWidth * .75,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#F0F0F0'
			}
		}

		return (
			<div>
			{(this.state.bothImagesLoaded) ?
				<div style={css.wrapper}>
					<img style={css.image} src={this.props.bgImage} alt="backmist" />
					<canvas
						style={css.canvas}
						width={windowWidth}
						height={windowWidth*.75}
						ref="myCanvas"
						onTouchEnd={this.handelTouchEnd.bind(this)}
						onTouchMove={this.handelTouchMove.bind(this)}
					/>
				</div> :
				<div style={css.loading}>Loading</div>
			}
			</div>
		);
	}
}