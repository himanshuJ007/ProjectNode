import React, { useState, useEffect } from 'react';
import './app.css';
import * as axios from 'axios';
import 'antd/dist/antd.css';
import {
  Form, Input, Checkbox, Card, Image, Avatar, Button, Collapse
} from 'antd';

const { Panel } = Collapse;
export default function App() {
  const [data, setData] = useState([]);

  useEffect(async () => {
    const jobs = await axios.get('/api/jobs');
    setData(jobs.data);
  }, []);
  console.log(data);

  const onFinish = async (values) => {
    console.log(values);
    let filters = '';
    if (values.keyword) {
      filters = `${filters}?keywords=${values.keyword}`;
    }
    if (values.checkbox) {
      let type = '';
      values.checkbox.forEach((val) => {
        type = `${type}${val},`;
      });
      if (values.keyword) {
        filters = `${filters}&type=${type}`;
      } else {
        filters = `?type=${type}`;
      }
    }
    const jobs = await axios.get(`/api/jobs/filter${filters}`);
    setData(jobs.data);
  };

  return (
    <div>

      <Form onFinish={onFinish}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ width: '30%' }}>
            <Form.Item name="keyword" label="Search By Keywords">
              <Input />
            </Form.Item>
          </div>
          <div style={{ width: '30%' }}>
            <Form.Item name="checkbox">
              <Checkbox.Group>
                <Checkbox value="All" style={{ lineHeight: '32px' }}>
                  All
                </Checkbox>
                <Checkbox value="Full-Time" style={{ lineHeight: '32px' }}>
                  Full-Time
                </Checkbox>
                <Checkbox value="Part-Time" style={{ lineHeight: '32px' }}>
                  Part-Time
                </Checkbox>
                <Checkbox value="Freelancer" style={{ lineHeight: '32px' }}>
                  Freelancer
                </Checkbox>
              </Checkbox.Group>
            </Form.Item>
          </div>
          <div style={{ width: '30%' }}>
            <Button type="primary" htmlType="submit">Submit</Button>
          </div>
        </div>
      </Form>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Collapse ghost>
          <Panel header="Advance Search" key="1">
            <div>
              <Button type="primary" style={{ padding: '10px' }}>Filter By Location</Button>
              <Button type="primary" style={{ padding: '10px', marginLeft: '10px' }}>Filter By Experience</Button>
            </div>

          </Panel>
        </Collapse>
        ,
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {data?.map(job => (
          <div style={{ width: '50%' }}>
            <Card title={job?.position} style={{ width: 700 }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ width: '40%' }}>
                  <Avatar
                    src=<Image src={job?.logo} />
                  />
                </div>
                <div style={{ width: '60%' }}>
                  <div>
                    <p>
                      {job?.company}
                      |
                      {job?.location}
                      |
                      {job?.experience}
                    </p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    <p>Skills:</p>
                    {job?.skills.map(skill => (
                      <p>
                        {skill}
                        {' '}
                        ,
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

        ))}
      </div>
    </div>
  );
}
