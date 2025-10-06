import ReactFlow, { Background, Controls } from 'reactflow';
import type { Node, Edge } from 'reactflow';

import 'reactflow/dist/style.css';

interface Props {
  canonicalName: string;
  parents: string[];
  children: string[];
}

const GraphTree: React.FC<Props> = ({ canonicalName, parents, children }) => {
  const nodes: Node[] = [
    ...parents.map((p, i) => ({
      id: `parent-${i}`,
      position: { x: 0, y: -100 * (i + 1) },
      data: { label: p },
    })),
    {
      id: 'main',
      position: { x: 250, y: 0 },
      data: { label: canonicalName },
    },
    ...children.map((c, i) => ({
      id: `child-${i}`,
      position: { x: 500, y: 100 * (i + 1) },
      data: { label: c },
    })),
  ];

  const edges: Edge[] = [
    ...parents.map((_, i) => ({
      id: `e-parent-${i}`,
      source: `parent-${i}`,
      target: 'main',
    })),
    ...children.map((_, i) => ({
      id: `e-child-${i}`,
      source: 'main',
      target: `child-${i}`,
    })),
  ];

  return (
    <div style={{ height: 400 }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default GraphTree;
