function CardCta({project}) {
	if (project.cta) {
		const { cta } = project;
		// console.log(cta);
		return (
			<div className="cta-container">
			{ cta.map((cta, index) => {
				return(
					<a className="cta wipe" href={cta.href} target="_blank" key={`${project.id}-cta${index}`}>{cta.txt}</a>
				)
			})}
			</div>
		);
	}
}

export default CardCta;