import { Col, Row } from "../Griding";

const Empty = ({ label="موردی وجود ندارد" }: { label?: string }) => {
  return (
    <Row gutter={[0, 10]} className="empty">
      <Col xs={24}>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40">
          <path
            fill="#B6B6B6"
            d="M26.984 3.333H13.017c-6.066 0-9.683 3.617-9.683 9.684v13.95c0 6.083 3.617 9.7 9.683 9.7h13.95c6.067 0 9.684-3.617 9.684-9.684V13.017c.016-6.067-3.6-9.684-9.667-9.684z"
            opacity="0.4"
          />
          <path
            fill="#B6B6B6"
            d="M35.5 20.383h-5.8a4.23 4.23 0 00-3.816 2.367l-1.4 2.767c-.333.666-1 1.083-1.733 1.083h-5.467c-.517 0-1.25-.117-1.733-1.083l-1.4-2.75a4.278 4.278 0 00-3.817-2.367H4.501a1.16 1.16 0 00-1.167 1.167V27c0 6.05 3.633 9.667 9.7 9.667h13.967c5.716 0 9.233-3.134 9.666-8.7V21.55a1.17 1.17 0 00-1.166-1.167z"
          />
        </svg>
      </Col>
      <Col xs={24} className="text_wrap text-secondary">
        {label}
      </Col>
    </Row>
  );
};

export default Empty;
