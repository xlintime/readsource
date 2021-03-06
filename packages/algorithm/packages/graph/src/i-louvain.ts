import louvain from './louvain';
import type { ClusterData, GraphData } from './types';

/**
 * 社区发现 i-louvain 算法：模块度 + 惯性模块度（即节点属性相似性）
 * @param graphData 图数据
 * @param directed 是否有向图，默认为 false
 * @param weightPropertyName 权重的属性字段
 * @param threshold 差值阈值
 * @param propertyKey 属性的字段名
 * @param involvedKeys 参与计算的key集合
 * @param uninvolvedKeys 不参与计算的key集合
 * @param inertialWeight 惯性模块度权重
 */
const iLouvain = (
    graphData: GraphData,
    directed: boolean = false,
    weightPropertyName: string = 'weight',
    threshold: number = 0.0001,
    propertyKey: string = undefined,
    involvedKeys: string[] = [],
    uninvolvedKeys: string[] = ['id'],
    inertialWeight: number = 1,
  ): ClusterData => {
  return louvain(graphData, directed, weightPropertyName, threshold, true, propertyKey, involvedKeys, uninvolvedKeys, inertialWeight);
}

export default iLouvain;
