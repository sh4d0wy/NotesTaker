import React, { useEffect, useState } from 'react';
import ReactFlow,{Background} from 'reactflow';

const FlowChart = ({ summary }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    if (summary) {
      const regex =   /^(#{1,6}\s.*|\*\*.+?\*\*)$/gm;
      const mainNodes = summary.split(regex).slice(1)
      const allData=[]
      const nodes1=[]
      const edges1=[]
      let node,edge;
      const pointsArray = mainNodes.map((match, index) => {
        const points = match.trim().split('\n-').map(point => point.trim());
        allData.push(points)
      });
      
      for(let data of allData){
        if(allData.indexOf(data)%2==0){
          node = {
            id: `${allData.indexOf(data)}`,
            type: "default",
            data: { label: data[0] },
            position: { x: 0, y: 100+allData.indexOf(data)*200 },
            style: {
              width: "auto",
              height: "auto", 
            },
          };
          if(allData.indexOf(data)+2!=allData.length-1 && allData.indexOf(data)+2<allData.length){
            edge = {
              source:`${allData.indexOf(data)}`,
              target:`${allData.indexOf(data)+2}`,
              type:"smoothstep",
              style:{
                  strokeWidth:"3"
              }
            }
            console.log(edge);
          }
          nodes1.push(node);
        edges1.push(edge);
        }
        else{
          let nodeArr = data
          for(let j=0;j<nodeArr.length;j++){
            node={
              id:`${allData.indexOf(data)-1}-${j}`,
              type:'default',
              data:{label:`${nodeArr[j]}`},
              position:{x:100+200,y:100 +allData.indexOf(data)*200+j*100},
              style:{
                width:'300px',
                height:'auto'
              },
              targetPosition:'left'
            }
            edge = {
              source:`${allData.indexOf(data)-1}`,
              target:`${allData.indexOf(data)-1}-${j}`,
              animated:true
            }
            nodes1.push(node);
            edges1.push(edge);
        }
      }

    }
    
    
      // const branchRegex = /(?<=\n#{1,6}\s)(?:(?!\n#{1,6}\s|\n-).)+(?=\n#{1,6}\s|\n*$)/gs;
      // const branchNodes = [summary.matchAll(branchRegex)]
      // const points = branchNodes.map(match => match[0].trim());
      // console.log(mainNodes)
      // console.log(points)
      // let nodes=[]
      // let edges=[]
      // for(let mainNode of mainNodes){
      //   let node = {
      //     id: `${mainNodes.indexOf(mainNode)}`,
      //     type: "default",
      //     data: { label: mainNode },
      //     position: { x: 100, y: 100},
      //     style: {
      //       width: "auto",
      //       height: "auto",
      //     },
      //   };
      //   console.log(node)
      // }
      // for(var i=0;i<allData.length;i++){
      //   let mainNode;
      //   let mainEdge;
      //   if(i%2==0){
      //     mainNode= {
      //       id:`${i}`,
      //       type:'default',
      //       data:{label:allData[i]},
      //       position:{x:100,y:100 + i*200},
      //       style:{
      //         width:'auto',
      //         height:'auto'
      //       }
      //     }
      //     if(i!=allData.length-2){
      //       mainEdge = {
      //         source:`${i}`,
      //         target:`${i+2}`,
      //         animated:true
      //       }
      //     }
      //     nodes.push(mainNode)
      //     edges.push(mainEdge)
      //   }
      //   else{
      //     let data = allData[i].split("\n")
      //     for(let j=0;j<data.length;j++){
      //       mainNode={
      //         id:`${i}-${j}`,
      //         type:'default',
      //         data:{label:data[j]},
      //         position:{x:100+i*100,y:100 + j*100},
      //         style:{
      //           width:'auto',
      //           height:'auto'
      //         }
      //       }
      //       mainEdge={
      //         source:`${i-1}`,
      //         target:`${i}-${j}`,
      //         animated:true
      //       }
      //       nodes.push(mainNode)
      //       edges.push(mainEdge)
      //     }
      //   }
      //   setNodes(nodes)
      //   setEdges(edges)
      // }
      // console.log("nodes "+nodes)
      // console.log("edges "+edges)
      // const nodes = [];
      // const edges = [];

      // for (const match of matches) {
      //   console.log(match);
      //   const mainNode = {
      //     id: `node-${match.index}`,
      //     type: 'default',
      //     data: { label: match[1] },
      //     position: { x: 100, y: 100 + match.index * 100 }, // Adjust positioning of nodes
      //   };

      //   nodes.push(mainNode);

      //   const branches = match[2].split('\n- ');
      //   for (let i = 0; i < branches.length; i++) {
      //     const branchNode = {
      //       id: `node-${match.index}_${i}`,
      //       type: 'default',
      //       data: { label: branches[i] },
      //       position: { x: 300, y: 100 + match.index * 100 + i * 100 }, // Adjust positioning of nodes
      //     };

      //     const edge = {
      //       id: `edge-${match.index}-${i}`,
      //       source: `node-${match.index}`,
      //       target: `node-${match.index}_${i}`,
      //       animated: true,
      //     };

      //     nodes.push(branchNode);
      //     edges.push(edge);
      //   }
      // }

      setNodes(nodes1)
      setEdges(edges1)
    }
  }, [summary]);

  return (
    <div style={{ height: '600px', width: '100%' }}>
        <ReactFlow nodes={nodes} edges={edges} >
          <Background color="white"variant="dots"/>
        </ReactFlow>
    </div>
  );
};

export default FlowChart;
