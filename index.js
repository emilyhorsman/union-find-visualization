import { DataSet, Network } from 'vis'


const nodes = new DataSet([
	{ id: 0, label: '0' },
	{ id: 1, label: '1' },
	{ id: 2, label: '2' },
	{ id: 3, label: '3' },
	{ id: 4, label: '4' },
	{ id: 5, label: '5' },
	{ id: 6, label: '6' },
	{ id: 7, label: '7' },
	{ id: 8, label: '8' },
	{ id: 9, label: '9' },
]);
const edges = new DataSet();
edges.add([
	{ from: 6, to: 5, arrows: { to: { enabled: true } } },
	{ from: 5, to: 0, arrows: { to: { enabled: true } } },
	{ from: 2, to: 1, arrows: { to: { enabled: true } } },
	{ from: 7, to: 1, arrows: { to: { enabled: true } } },
	{ from: 4, to: 3, arrows: { to: { enabled: true } } },
	{ from: 3, to: 8, arrows: { to: { enabled: true } } },
	{ from: 9, to: 8, arrows: { to: { enabled: true } } },
	{ from: 0, to: 1, arrows: { to: { enabled: true } } }
]);
const data = { nodes: nodes, edges: edges };
const options = {
	layout: {
		hierarchical: {
			enabled: true,
			sortMethod: 'directed',
			direction: 'DU',
		}
	}
}
const container = document.querySelector('.app');
const network = new Network(container, data, options);
