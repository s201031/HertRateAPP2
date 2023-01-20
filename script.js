
document.querySelectorAll('.help_icon').forEach (elm => {
	elm.onclick = function () {
    
		event.stopPropagation();
		let tooltip = this.parentNode.querySelector('.tooltip');
		if (tooltip.style.display == 'block') {
			tooltip.style.display = 'none';
		} else {
			tooltip.style.display = 'block';
		}
	};
});
document.body.onclick = function () {
	document.querySelectorAll('.tooltip').forEach (tooltip => {
		tooltip.style.display = 'none';
	});
};