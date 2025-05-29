import React from 'react';
import { Card, Descriptions } from 'antd';

interface Props {
  scores: Record<string, number>;
  totalScore?: number;
  method: string;
  priority?: { area?: string; group?: string; score?: number };
}

const ApplicationScoresCard: React.FC<Props> = ({ scores, totalScore, method, priority }) => (
  <Card title="Thông tin điểm thi" className="info-card">
    <Descriptions column={3}>
      {Object.entries(scores).map(([subject, score]) => (
        <Descriptions.Item label={`Điểm ${subject}`} key={subject}>
          {score}
        </Descriptions.Item>
      ))}
    </Descriptions>
    {priority && (
      <div className="priority-info">
        <Descriptions column={3}>
          <Descriptions.Item label="Khu vực ưu tiên">{priority.area}</Descriptions.Item>
          <Descriptions.Item label="Đối tượng ưu tiên">{priority.group}</Descriptions.Item>
          {method === 'tot_nghiep' && (
            <Descriptions.Item label="Điểm ưu tiên">{priority.score}</Descriptions.Item>
          )}
        </Descriptions>
      </div>
    )}
    <div className="total-score">
      <span>Tổng điểm xét tuyển: </span>
      <span className="score-value">
        {typeof totalScore === 'number' ? totalScore.toFixed(2) : '---'}
      </span>
    </div>
  </Card>
);

export default ApplicationScoresCard;
