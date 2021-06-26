import React, {useState} from "react";
import {AgGridReact} from "ag-grid-react";
import axios from "axios";
import {Button, Col, Form, Input, InputNumber, Row, Table} from "antd";
import {AgAbstractField} from "ag-grid-community";

const columnDefs = [
    {
        title: 'Birth date',
        dataIndex: 'birth_date',
        key: 'birth_date',
        width: 150,
    },
    {
        title: 'File name',
        dataIndex: 'file_name',
        key: 'file_name',
        width: 150
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        width: 150,
        filtered: true,
    },
    {
        title: 'Content',
        dataIndex: 'cv_content',
        key: 'cv_content',
        minWidth: 500,
        // render: (value: string) => {
        //     return value.replace(/[^a-zA-Z ]/g, ".")
        // }
    }
]
const data = [
    {
        key: '1',
        birth_date: 'test birthday1',
        file_name: 'test file_name1',
        gender: 'Nam',
        cv_content: "Chiều về là lúc bến sông quê tôi tấp nập nhất. Đoàn thuyền chở các bà, các chị từ chợ huyện, chợ tỉnh về cập bến. Các bà các chị được đàn con ùa ra đón. Con lớn đỡ cho mẹ gánh hàng. Con nhỏ vòi mẹ chia quà. Tiếng cười nói rộn ràng cả một khúc sông. Rồi ai về nhà nây. Con thuyền neo vào bến đỗ. Đây cũng là lúc bọn trẻ chăn trâu lùa trâu xuống tắm. Bọn trẻ tắm cho trâu, rồi bọn trẻ giỡn nước. Chúng té nước cho nhau. Chúng chơi trò đánh trận. Một đứa kiếm đâu được trái bóng tròn. Thế là chúng ném bóng cho nhau. Một ý kiến được cả bọn chấp nhận: chơi bóng nước. Chúng chia làm hai phe, chuyền bóng cho nhau. Phe nào chuyền được 6 chuyền là thắng. Phe thua phải cõng phe thắng chạy dọc con sông suốt từ bến tắm đến tận gốc đa. Bến sông quê tôi cứ rộn ràng như vậy cho đến lúc mặt trời lặn phía chân ười mới có chút bình lặng.\n" +
            "\n"
    },
    {
        key: '2',
        birth_date: 'test birthday2',
        file_name: 'test file_name2',
        gender: 'Nữ',
        cv_content: "Chiều về là lúc bến sông quê tôi tấp nập nhất. Đoàn thuyền chở các bà, các chị từ chợ huyện, chợ tỉnh về cập bến. Các bà các chị được đàn con ùa ra đón. Con lớn đỡ cho mẹ gánh hàng. Con nhỏ vòi mẹ chia quà. Tiếng cười nói rộn ràng cả một khúc sông. Rồi ai về nhà nây. Con thuyền neo vào bến đỗ. Đây cũng là lúc bọn trẻ chăn trâu lùa trâu xuống tắm. Bọn trẻ tắm cho trâu, rồi bọn trẻ giỡn nước. Chúng té nước cho nhau. Chúng chơi trò đánh trận. Một đứa kiếm đâu được trái bóng tròn. Thế là chúng ném bóng cho nhau. Một ý kiến được cả bọn chấp nhận: chơi bóng nước. Chúng chia làm hai phe, chuyền bóng cho nhau. Phe nào chuyền được 6 chuyền là thắng. Phe thua phải cõng phe thắng chạy dọc con sông suốt từ bến tắm đến tận gốc đa. Bến sông quê tôi cứ rộn ràng như vậy cho đến lúc mặt trời lặn phía chân ười mới có chút bình lặng.\n" +
            "\n",
    },
    {
        key: '3',
        birth_date: 'test birthday3',
        file_name: 'test file_name3',
        gender: 'Nam3',
        cv_content: "Chiều về là lúc bến sông quê tôi tấp nập nhất. Đoàn thuyền chở các bà, các chị từ chợ huyện, chợ tỉnh về cập bến. Các bà các chị được đàn con ùa ra đón. Con lớn đỡ cho mẹ gánh hàng. Con nhỏ vòi mẹ chia quà. Tiếng cười nói rộn ràng cả một khúc sông. Rồi ai về nhà nây. Con thuyền neo vào bến đỗ. Đây cũng là lúc bọn trẻ chăn trâu lùa trâu xuống tắm. Bọn trẻ tắm cho trâu, rồi bọn trẻ giỡn nước. Chúng té nước cho nhau. Chúng chơi trò đánh trận. Một đứa kiếm đâu được trái bóng tròn. Thế là chúng ném bóng cho nhau. Một ý kiến được cả bọn chấp nhận: chơi bóng nước. Chúng chia làm hai phe, chuyền bóng cho nhau. Phe nào chuyền được 6 chuyền là thắng. Phe thua phải cõng phe thắng chạy dọc con sông suốt từ bến tắm đến tận gốc đa. Bến sông quê tôi cứ rộn ràng như vậy cho đến lúc mặt trời lặn phía chân ười mới có chút bình lặng.\n" +
            "\n",
    },
];
export const SearchHaystack: React.FC = () => {
    const [dataResponse, setDataResponse] = useState<any[]>([])

    const onFinish = async (values: any) => {
        console.log(values)
        const formValues = {
           'gender': values?.user.gender,
            'major': values?.user.major,
            'languages': values?.user.languages,
            'skills': values?.user.skills,
        }   

        // setDataResponse(data)
        axios.post('http://13.213.71.142/searchCvAdvance', formValues)
            .then((res: any) => {
                const data = res.data.res
                const finalResponse = data.map((item: any, index: number) => {
                    const subItem = item._source
                    subItem.key = index
                    return subItem
                })
                setDataResponse(finalResponse)
            })
    }
    return <>
        <Row>
            <Col span={12} offset={6} className="fieldset">
                <h1>Haystack</h1>
                <Col span={16} offset={4}>
                    <Form name="nest-messages" onFinish={onFinish}>
                        <Form.Item name={['user', 'gender']} label="Gender">
                            <Input/>
                        </Form.Item>

                        <Form.Item name={['user', 'language']} label="Language">
                            <Input/>
                        </Form.Item>

                        <Form.Item name={['user', 'skills']} label="Skills">
                            <Input/>
                        </Form.Item>

                        <Form.Item name={['user', 'major']} label="Major">
                            <Input/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Col>
        </Row>
        <Row className={"row-table"}>
            <Col span={20} offset={2}>

                <Table
                    columns={columnDefs}
                    dataSource={dataResponse}
                    // loading={}
                />
            </Col>
        </Row>
    </>
}