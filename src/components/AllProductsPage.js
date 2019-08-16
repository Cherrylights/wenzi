import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BrowserView, MobileView, isBrowser } from "react-device-detect";
import Smooth from "../utils/Smooth";

class AllProducts extends Component {
	componentDidMount() {
		if (isBrowser) {
			document.body.style.cssText = "";
			new Smooth();
		}
	}

	componentDidUpdate(prevProps) {
		if (isBrowser) {
			//Make sure the component will get properly re-rendered even if the props get updated after the componentDidMount call
			if (this.props.availableProducts !== prevProps.availableProducts) {
				document.body.style.cssText = "";
				new Smooth();
			}
		}
	}

	componentWillUnmount() {}

	render() {
		const { availableProducts } = this.props;
		return (
			<div className="allProducts-page transition-item" data-scroll>
				<MobileView>
					<div className="AvailableProducts">
						<h1 className="AvailableProducts__title">All Products</h1>
						<div className="AvailableProducts__grid">
							{availableProducts.map(product => (
								<div key={product.id}>
									<Link to={`/work/${product.handle}`}>
										{product.options[2].values[0].value === "Square" ? (
											<img
												src={product.images[0].src}
												draggable="false"
												alt="scarf"
												className="AvailableProducts__image"
											/>
										) : (
											<img
												src={product.images[2].src}
												draggable="false"
												alt="scarf"
												className="AvailableProducts__image"
											/>
										)}
									</Link>
									<Link to={`/work/${product.handle}`}>
										<p className="AvailableProducts__name">{product.title}</p>
									</Link>
								</div>
							))}
						</div>
					</div>
				</MobileView>
				<BrowserView>
					<div className="AvailableProducts--update">
						<div className="scroll-content" data-scroll-content>
							{availableProducts.map((product, index) => (
								<article
									className={`slide slide--${index} js-slide`}
									key={product.id}
								>
									<div className="slide__inner">
										<div className="slide__img js-transition-img">
											<figure className="js-transition-img__inner">
												{product.options[2].values[0].value === "Square" ? (
													<img
														src={product.images[0].src}
														draggable="false"
														alt="scarf"
													/>
												) : (
													<img
														src={product.images[2].src}
														draggable="false"
														alt="scarf"
													/>
												)}
											</figure>
										</div>
									</div>
								</article>
							))}
						</div>
						<div
							className="scroll-content scroll-content--last"
							data-scroll-content
						>
							{availableProducts.map((product, index) => (
								<article
									className={`slide slide--${index} js-slide`}
									key={product.id}
								>
									<div className="slide__inner">
										<div className="slide__sub-title__top">
											<span>{product.options[0].values[0].value}</span>
										</div>
										<h1 className="slide__title">
											<div className="js-transition-title">{product.title}</div>
										</h1>
										<div className="slide__sub-title__bottom">
											<span>{product.options[2].values[0].value}</span>
										</div>
										<div className="slide__img slide__img--proxy">
											<Link
												className="slide__img-link"
												to={`/work/${product.handle}`}
											/>
										</div>
										<div className="slide__project">
											{product.options[1].values[0].value}
										</div>
									</div>
								</article>
							))}
						</div>
						<div className="scrollbar" data-scrollbar>
							<div className="scrollbar__handle js-scrollbar__handle" />
						</div>
					</div>
				</BrowserView>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		availableProducts: state.availableProducts
	};
}

export default connect(
	mapStateToProps,
	null
)(AllProducts);
