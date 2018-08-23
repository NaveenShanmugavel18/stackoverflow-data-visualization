$( document ).ready(function() {
	var id = $('canvas').attr('id');
	var ids = ['newQuestionChart', 'featuredQuestionChart'];
	
	if(ids.includes(id)) {
		new Chart($('#'+id), {
			type: 'bar',
			data: {
				labels: $('#'+id).data('labels'),
				datasets: [{
					label: "New questions",
					backgroundColor: ["#871fc7", "#db0d80", "#851e6e", "#f8f03a", "#21337f", "#8e60fd", "#d464b5", "#ddaa7c", "#2e57da", "#c9fb50", "#fdab09", "#5ba721", "#6d0868", "#522da1", "#9b5e14", "#593fd1", "#ef3e38", "#a0a879", "#a9fad7", "#f299d0", "#a5ab3b", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
					data: $('#'+id).data('count')
				}]
			},
			options: {
				legend: {
					display: false
				},
				title: {
					display: true,
					text: $('#'+id).data('title')
				}
			}
		});
	}
})