import { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import api from "../api/axios";

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get("/admin/logs").then((res) => setLogs(res.data));
  }, []);

  return (
    <Table
      rowKey="id"
      dataSource={logs}
      columns={[
        { title: "ID", dataIndex: "id", width: 60 },
        {
          title: "User",
          render: (row) =>
            row.user_name ? (
              <>
                {row.user_name} <br />
                <small>{row.user_email}</small>
              </>
            ) : (
              <Tag>System</Tag>
            )
        },
        { title: "Action", dataIndex: "action" },
        { title: "Time", dataIndex: "created_at" }
      ]}
    />
  );
}
