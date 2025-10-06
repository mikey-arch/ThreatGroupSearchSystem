import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactFlow, { Background, Controls } from 'reactflow';
import type { Node, Edge } from 'reactflow';

import 'reactflow/dist/style.css';

interface Props {
  canonicalName: string;
  parents: string[];
  children: string[];
}

const GraphTree: React.FC<Props> = ({ canonicalName, parents, children }) => {
  const navigate = useNavigate();

  const handleNodeClick = useCallback(async (_event: React.MouseEvent, node: Node) => {
    const groupName = node.data.label as string;

    try {
      // Fetch the threat group by canonical name to get its ID
      const response = await fetch(`/api/threatgroups/${encodeURIComponent(groupName)}`);
      const data = await response.json();

      if (data._id) {
        navigate(`/profile/${data._id}`);
      }
    } catch (error) {
      console.error('Failed to fetch threat group:', error);
    }
  }, [navigate]);

  const nodes: Node[] = [
    ...parents.map((p, i) => ({
      id: `parent-${i}`,
      position: { x: 0, y: -100 * (i + 1) },
      data: { label: p },
      style: { cursor: 'pointer' },
    })),
    {
      id: 'main',
      position: { x: 250, y: 0 },
      data: { label: canonicalName },
      style: { cursor: 'default' },
    },
    ...children.map((c, i) => ({
      id: `child-${i}`,
      position: { x: 500, y: 100 * (i + 1) },
      data: { label: c },
      style: { cursor: 'pointer' },
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
      <ReactFlow nodes={nodes} edges={edges} onNodeClick={handleNodeClick} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default GraphTree;
