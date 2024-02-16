import { useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CardCta from './CardCta';
// import WorkCard from './WorkCard';
import { global, work } from '../data.json';	

// gsap.registerPlugin(ScrollTrigger);

function Work() {
	
	// const container = useRef();
	/* 
		Create array of refs for the multiple sections I want to access individually
	*/
	const revealRefs = useRef([]);
  revealRefs.current = [];

	const addToRefs = (section) => {
		console.log('addToRefs');
		if (section && !revealRefs.current.includes(section)) {
			revealRefs.current.push(section);
		}
	}
	/* 
		Our Hook
	*/
	useGSAP((context) => {

		revealRefs.current.forEach((section, index) => {
			console.log('useGSAP	'+index, section);

			let isImgRight = section.classList.contains("img-right"),
				_elements = [section.querySelector('.work-img-wrapper'), section.querySelector('.work-txt-wrapper')];
			// console.log(isImgRight);
			 gsap.set(_elements, { css:{visibility:'hidden',transformPerspective:500, transformStyle:"preserve-3d", backfaceVisibility:"hidden"}});
	
			gsap.from(_elements, {
				autoAlpha:0,
				scale:0.2,
				rotationY: isImgRight ? 90 : -90,
				duration: 1,
				stagger: .2, 
				transFormOrigin:'center center center',
				scrollTrigger:{
					trigger: section.querySelector('.work-img-wrapper'),
					toggleActions:'restart none resume reset',
					start: 'top 80%%', // element, viewport
					end: `top center`,
					scrub: true,
					invalidateOnRefresh: true,
					// markers:true
				}
			});
		});

		// console.log(context);
	}/* , {scope: revealRefs} */);


	return (
		<main>
			<h2 className="title">WORK</h2>
			
			{ work.map((project, index) => {
				// console.log(index, project);
				// const props = [project, addToRefs];
				return(
					<>
					{/* <WorkCard project={[project, addToRefs]} key={project.id} /> */}
					<section className={`work-container ${project.imgDirectionClass}`} ref={addToRefs} key={project.id}>
						<div className="work-txt-wrapper">
							<h3>{project.h3}</h3>
							<h4>Client: <span>{project.client}</span></h4>
							{ project.stack && <h4>Stack: <span>{project.stack}</span></h4> }
							{ project.layout && <h4>layout: <span>{project.layout}</span></h4> }
							<p dangerouslySetInnerHTML={{__html:project.p}}></p>
							<CardCta project={project}/>
						</div>
						<div className="work-img-wrapper">
							<img srcSet={project.img.srcset} src={project.img.src} alt={project.img.alt}/>
						</div>
					</section>
					</>
				);
			})}
		</main>
	);
};

export default Work;