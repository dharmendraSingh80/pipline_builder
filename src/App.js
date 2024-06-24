import React, { useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
  Controls,
  Background,
  Handle,
} from "reactflow";

import "reactflow/dist/style.css";
import "./index.css"; // Import the CSS file for Tailwind

const initialNodes = [
  {
    id: "1",
    type: "source",
    position: { x: 10, y: 20 },
    data: { label: "Source 1" },
  },
  {
    id: "2",
    type: "source",
    position: { x: 10, y: 200 },
    data: { label: "Source 2" },
  },
  {
    id: "3",
    type: "source",
    position: { x: 10, y: 400 },
    data: { label: "Source 3" },
  },
  {
    id: "4",
    type: "destination",
    position: { x: 1000, y: 100 },
    data: { label: "Destination 1" },
  },
  {
    id: "5",
    type: "destination",
    position: { x: 1000, y: 300 },
    data: { label: "Destination 2" },
  },
];

const initialEdges = [
  { id: "e1-4", source: "1", target: "4" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e3-5", source: "3", target: "5" },
];

const nodeTypes = {
  source: (props) => (
    <div className="bg-blue-500 text-white p-2 rounded-lg border border-black">
      {props.data.label}
      <Handle type="source" position="right" className="w-3 h-3 bg-white" />
    </div>
  ),
  destination: (props) => (
    <div className="bg-orange-300 text-black p-2 rounded-lg border border-black">
      <Handle type="target" position="left" className="w-3 h-3 bg-black" />
      {props.data.label}
    </div>
  ),
};

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onConnect = (params) => {
    const sourceNode = nodes.find((node) => node.id === params.source);
    const targetNode = nodes.find((node) => node.id === params.target);
    if (sourceNode.type === "source" && targetNode.type === "destination") {
      setEdges((eds) => addEdge(params, eds));
    } else {
      alert("You can only connect a Source to a Destination.");
    }
  };

  const onNodesChange = (changes) =>
    setNodes((nds) => applyNodeChanges(changes, nds));
  const onEdgesChange = (changes) =>
    setEdges((eds) => applyEdgeChanges(changes, eds));

  const onEdgeClick = (event, edge) => {
    event.stopPropagation();
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  };

  const addNode = (type) => {
    const newNode = {
      id: `${type}-${nodes.length + 1}`,
      type: type,
      data: {
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${
          nodes.length + 1
        }`,
      },
      position: {
        x: Math.random() * window.innerWidth - 200,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div className="w-screen h-screen">
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => addNode("source")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Add Source Node
        </button>
        <button
          onClick={() => addNode("destination")}
          className="px-4 py-2 bg-orange-300 text-black rounded-lg"
        >
          Add Destination Node
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onEdgeClick={onEdgeClick}
        nodeTypes={nodeTypes}
        deleteKeyCode={46} /* delete key */
      >
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
  );
}
