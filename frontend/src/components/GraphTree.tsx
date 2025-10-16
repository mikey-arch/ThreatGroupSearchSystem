import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
} from "reactflow";

import type { Node, Edge } from "reactflow";

import "reactflow/dist/style.css";

interface Props {
  canonicalName: string;
  parents: string[];
  children: string[];
}

const GraphTree: React.FC<Props> = ({ canonicalName, parents, children }) => {
  const navigate = useNavigate();

  //Handle clicking on a node to navigate to its profile
  const handleNodeClick = useCallback(
    async (_event: React.MouseEvent, node: Node) => {
      const groupName = node.data.label as string;
      //Dont navigate to self
      if (groupName === canonicalName) return;

      try {
        const response = await fetch(`/api/threatgroups/${encodeURIComponent(groupName)}`);
        const data = await response.json();
        if (data._id) {
          navigate(`/profile/${data._id}`);
        }
      } catch (error) {
        console.error("Failed to fetch threat group:", error);
      }
    },
    [navigate, canonicalName]
  );

  //Helpers to spread nodes horizontally
  const horizontalSpacing = 200;
  const verticalSpacing = 150;

  const centerX = 0;

  //Create parent nodes positioned above main
  const parentNodes: Node[] = parents.map((parent, i) => ({
    id: `parent-${i}`,
    position: {
      x: centerX + (i - (parents.length - 1) / 2) * horizontalSpacing,
      y: -verticalSpacing,
    },
    data: { label: parent },
    style: {
      cursor: "pointer",
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      padding: 10,
    },
  }));

  //Create children nodes positioned below main
  const childNodes: Node[] = children.map((child, i) => ({
    id: `child-${i}`,
    position: {
      x: centerX + (i - (children.length - 1) / 2) * horizontalSpacing,
      y: verticalSpacing,
    },
    data: { label: child },
    style: {
      cursor: "pointer",
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      padding: 10,
    },
  }));

  //Main node in the center
  const nodes: Node[] = [
    ...parentNodes,
    {
      id: "main",
      position: { x: centerX, y: 0 },
      data: { label: canonicalName },
      style: {
        backgroundColor: "#cce4ff",
        border: "2px solid #007bff",
        padding: 12,
        fontWeight: "bold",
      },
    },
    ...childNodes,
  ];

  //Connect edges from parents to main and main to children
  const edges: Edge[] = [
    ...parents.map((_, i) => ({
      id: `e-parent-${i}`,
      source: `parent-${i}`,
      target: "main",
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#555",
      },
      style: {
        stroke: "#555",
        strokeWidth: 2,
      },
    })),
    ...children.map((_, i) => ({
      id: `e-child-${i}`,
      source: "main",
      target: `child-${i}`,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#555",
      },
      style: {
        stroke: "#555",
        strokeWidth: 2,
      },
    })),
  ];

  return (
    <div style={{ height: 500 }}>
      <ReactFlow nodes={nodes} edges={edges} onNodeClick={handleNodeClick} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default GraphTree;
