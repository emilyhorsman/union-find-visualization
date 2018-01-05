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
			this.edges.update({ id: i, from: i, to: j });
			this.id[i] = j;
			this.sz[j] += this.sz[i];
		} else {
			this.edges.update({ id: j, from: j, to: i });
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


uf.union(4, 3);
uf.union(3, 8);
uf.union(6, 5);
uf.union(9, 4);
uf.union(2, 1);
uf.union(8, 9);
uf.union(5, 0);
uf.union(7, 2);
uf.union(6, 1);
uf.union(1, 0);
uf.union(6, 7);
