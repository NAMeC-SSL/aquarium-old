import React from "react";
import { BufferGeometry, Shape, Vector3 } from "three";

export interface Field {
  width: number;
  length: number;
  centerMark: {
    radius: number;
  };
  goal: {
    width: number;
    depth: number;
  };
  penalty: {
    width: number;
    depth: number;
  };
}

export interface GeometryProps {
  field: Field;
  color: string;
}

export const GeometryField: React.FC<GeometryProps> = (
  props: GeometryProps
) => {
  const width = props.field.width / 2;
  const length = props.field.length / 2;

  const outerLine: Array<Vector3> = [
    new Vector3(-length, -width, 0),
    new Vector3(-length, width, 0),
    new Vector3(length, width, 0),
    new Vector3(length, -width, 0),
    new Vector3(-length, -width, 0),
  ];

  const lineVertical: Array<Vector3> = [
    new Vector3(-0, width, 0),
    new Vector3(-0, -width, 0),
  ];

  const centerCircle = new Shape();
  centerCircle.moveTo(0, 0);
  centerCircle.arc(0, 0, props.field.centerMark.radius, 0, 2 * Math.PI, false);

  const points = centerCircle.getPoints();
  const geometryPoints = new BufferGeometry().setFromPoints(points);

  const penaltywidth = props.field.penalty.width / 2;
  const penaltydepth = props.field.penalty.depth;

  const rightPenalty: Array<Vector3> = [
    new Vector3(length, penaltywidth, 0),
    new Vector3(length - penaltydepth, penaltywidth, 0),
    new Vector3(length - penaltydepth, -penaltywidth, 0),
    new Vector3(length, -penaltywidth, 0),
  ];

  const leftPenalty: Array<Vector3> = [
    new Vector3(-length, penaltywidth, 0),
    new Vector3(-length + penaltydepth, penaltywidth, 0),
    new Vector3(-length + penaltydepth, -penaltywidth, 0),
    new Vector3(-length, -penaltywidth, 0),
  ];

  const goalwidth = props.field.goal.width / 2;
  const goaldepth = props.field.goal.depth;

  const goalLeft: Array<Vector3> = [
    new Vector3(-length, goalwidth, 0),
    new Vector3(-length - goaldepth, goalwidth, 0),
    new Vector3(-length - goaldepth, -goalwidth, 0),
    new Vector3(-length, -goalwidth, 0),
  ];

  const goalRight: Array<Vector3> = [
    new Vector3(length, goalwidth, 0),
    new Vector3(length + goaldepth, goalwidth, 0),
    new Vector3(length + goaldepth, -goalwidth, 0),
    new Vector3(length, -goalwidth, 0),
  ];

  return (
    <group>
      <line>
        <geometry vertices={outerLine}></geometry>
        <lineBasicMaterial
          attach="material"
          color={props.color}
        ></lineBasicMaterial>
      </line>
      <line>
        <geometry vertices={lineVertical}></geometry>
        <lineBasicMaterial
          attach="material"
          color={props.color}
        ></lineBasicMaterial>
      </line>
      <lineLoop geometry={geometryPoints}>
        <lineBasicMaterial
          attach="material"
          color={props.color}
          linewidth={1}
        ></lineBasicMaterial>
      </lineLoop>
      <line>
        <geometry vertices={leftPenalty}></geometry>
        <lineBasicMaterial
          attach="material"
          color={props.color}
        ></lineBasicMaterial>
      </line>
      <line>
        <geometry vertices={rightPenalty}></geometry>
        <lineBasicMaterial
          attach="material"
          color={props.color}
        ></lineBasicMaterial>
      </line>
      <line>
        <geometry vertices={goalLeft}></geometry>
        <lineBasicMaterial
          attach="material"
          color={props.color}
        ></lineBasicMaterial>
      </line>
      <line>
        <geometry vertices={goalRight}></geometry>
        <lineBasicMaterial
          attach="material"
          color={props.color}
        ></lineBasicMaterial>
      </line>
    </group>
  );
};
