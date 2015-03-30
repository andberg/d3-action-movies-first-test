document.addEventListener("DOMContentLoaded", function (event) {

	console.log("DOM fully loaded and parsed");
});

var filmArrayMasters = [];

d3.json('./resources/action-movies.json', function (data) {
	console.log(data);
	filmArrayMasters = data.nodes;

	d3.selectAll('#masters').selectAll('div')
		.data(filmArrayMasters)
		.enter().append('p')
		.classed('film', true)
		.html(function (f) {
			var master = createTextFromObject(f);

			if (!f.children.isEmpty) {
				master += '<br><div class="children"><br> <span class="child-header">Children: </span> <br>';

				f.children.forEach(function (child) {
					master += createTextFromObject(child) + '<br>';

					if (!child.children.isEmpty && child.children.length > 0) {
						master += '<div class="childrens-children">';
						master += ' <span class="child-header"><br>Children:</span><br>';
						child.children.forEach(function (child) {
							master += createTextFromObject(child) + '<br>';
						});

						master += '</div>';
					}
				});
				master += '</div>';
			}
			return master + '<br>';
		});
});

var createTextFromObject = function (film) {
	var filmString = '';
	var newLine = '<br>';

	filmString = '<span class="film-headline">' + film.headline.toUpperCase() + '</span>' + newLine + film.title.toUpperCase() + ', ' + film.year + newLine + 'Director: ' + film.director;

	if (film.secondUnitDirector) {
		filmString += newLine + 'Second Unit Director: ' + film.secondUnitDirector;
	}
	if (film.stuntCoordinator) {
		filmString += newLine + 'Stunt Coordinator: ' + film.stuntCoordinator;
	}
	if (film.editing) {
		filmString += newLine + 'Editing: ' + film.editing;
	}
	if (film.cinematography) {
		filmString += newLine + 'Cinematography: ' + film.cinematography;
	}
	if (film.fightChoreographer) {
		filmString += newLine + 'Fight Choreographer: ' + film.fightChoreographer;
	}
	if (film.actionCoordinator) {
		filmString += newLine + 'Action Coordinator: ' + film.actionCoordinator;
	}
	if (film.carStuntCoordinator) {
		filmString += newLine + 'Car Stunt Coordinator: ' + film.carStuntCoordinator;
	}
	if (film.actionDirector) {
		filmString += newLine + 'Action Director: ' + film.actionDirector;
	}
	if (film.actionChoreographer) {
		filmString += newLine + 'Action Choreographer: ' + film.actionChoreographer;
	}
	if (film.fightingInstructor) {
		filmString += newLine + 'Fighting Instructor: ' + film.fightingInstructor;
	}

	filmString = newLine + filmString;
	return filmString;
};

function isEmpty(obj) {
	// null and undefined are "empty"
	if (obj === null) return true;

	// Assume if it has a length property with a non-zero value
	// that that property is correct.
	if (obj.length > 0) return false;
	if (obj.length === 0) return true;

	// Otherwise, does it have any properties of its own?
	// Note that this doesn't handle
	// toString and valueOf enumeration bugs in IE < 9
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key)) return false;
	}

	return true;
}