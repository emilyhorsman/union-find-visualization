import { DataSet, Network } from 'vis'


class WeightedQuickUnionUF {
	constructor(n, nodes, edges) {
		this.nodes = nodes;
		this.edges = edges;
		this.id = [];
		this.sz = [];
		this.count = n;
		for (let i = 0; i < n; i++) {
			this.id[i] = i;
			this.sz[i] = 1;
			nodes.add({ id: i, label: i.toString() });
			edges.add({ id: i, arrows: { to: { enabled: true } } });
		}
	}

	find(p) {
		while (p != this.id[p]) {
			p = this.id[p];
		}
		return p;
	}

	union(p, q) {
		const i = this.find(p);
		const j = this.find(q);
		if (i === j) {
			return;
		}

		if (this.sz[i] < this.sz[j]) {
			this.edges.update({ id: i, from: i, to: j, prev: this.edges.get(i).to });
			this.id[i] = j;
			this.sz[j] += this.sz[i];
		} else {
			this.edges.update({ id: j, from: j, to: i, prev: this.edges.get(i).to });
			this.id[j] = i;
			this.sz[i] += this.sz[j];
		}

		this.count--;
	}
}

const nodes = new DataSet();
const edges = new DataSet();
const uf = new WeightedQuickUnionUF(10, nodes, edges);

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


import unions from './tinyUF.txt'
const lines = unions.split("\n").slice(1)
	.map(line => {
		const parts = line.split(" ");
		const p = parseInt(parts[0]);
		const q = parseInt(parts[1]);
		return { p, q };
	});
let i = 0;


function stepForward() {
	if (i >= lines.length) {
		return;
	}

	uf.union(lines[i].p, lines[i].q);
	i++;
}


function stepBackward() {
	if (i <= 0) {
		return;
	}

	i--;
}


document.querySelector('.js-step-forward').addEventListener('click', stepForward);
document.querySelector('.js-step-backward').addEventListener('click', stepBackward);