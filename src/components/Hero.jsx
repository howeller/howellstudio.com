import {global, hero} from '../data.json';
import '../scss/style.scss';

function Hero() {
	return (
		<section className="hero">
			<div className="hero-img-wrapper">
				<img srcSet={hero.img.srcset} src={hero.img.src} alt={hero.img.alt} />
			</div>
			<div className="hero-txt-wrapper">
				<h2>{ hero.h2 }</h2>
				<p dangerouslySetInnerHTML={{__html:hero.p}}></p>
			</div>
		</section>
	);
}

export default Hero;