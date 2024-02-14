import { global, work } from '../data.json';
import CardCta from './CardCta';
import '../scss/style.scss';

function Work() {
	return (
		<main>
			<h2 className="title">WORK</h2>
			{ work.map(project => {
				// console.log(project);
				return(
					<section className={`work-container ${project.imgDirectionClass}`} key={project.id}>
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
				);
			})}
		</main>
	);
};

export default Work;