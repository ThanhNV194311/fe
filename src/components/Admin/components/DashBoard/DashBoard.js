import React, { useEffect, useState } from "react";
import {
    BellOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    DollarCircleOutlined,
    FileTextOutlined,
} from "@ant-design/icons";
import {
    Button,
    Col,
    DatePicker,
    Form,
    Progress,
    Row,
    Space,
    Table,
    message,
} from "antd";
import "./DashBoard.css";
import ChartDashBoard from "./ChartDashBoard";
import axios from "axios";
import { useSelector } from "react-redux";
import FormItem from "antd/es/form/FormItem";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import { Excel } from "antd-table-saveas-excel";
import { Pie } from "@ant-design/plots";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

export default function DashBoard() {
    const [form] = Form.useForm();
    const [valuePage, setValuePage] = useState();
    const [submit, setSubmit] = useState(0);
    const [dateSearch, setDateSearch] = useState({
        start: dayjs().startOf("year").format("YYYY-MM-DD"),
        end: dayjs().endOf("year").format("YYYY-MM-DD"),
    });
    const {
        userSignin: { userInfo },
    } = useSelector((state) => state);

    useEffect(() => {
        const fetch = async () => {
            const { data } = await axios.post(
                "http://localhost:4000/order/findInfo",
                {
                    start: dayjs(dateSearch.start).format("YYYY-MM-DD"),
                    end: dayjs(dateSearch.end).format("YYYY-MM-DD"),
                },
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            form.setFieldsValue({
                start: dateSearch.start
                    ? dayjs(dateSearch.start, "YYYY-MM-DD")
                    : null,
                end: dateSearch.end
                    ? dayjs(dateSearch.end, "YYYY-MM-DD")
                    : null,
            });
            setValuePage(data);
        };
        fetch();
    }, [submit]);
    const handleFillStatus = (list, name, value) => {
        if (!list) return;
        const arr = list?.filter((e) => e[name] === value);
        if (arr?.length) {
            return arr?.length;
        } else {
            return 0;
        }
    };

    const handleTotal = (list) => {
        if (!list) return;

        let total = 0;
        list.map((e) => {
            total += e.totalPrice;
        });
        return total;
    };

    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    const column = [
        {
            title: "stt",
            align: "center",
            with: "5%",
            render: (_, record, index) => {
                return index + 1;
            },
        },
        {
            title: "Tên sản phẩm",
            align: "left",
            with: "20%",
            dataIndex: "orderItems",
            render: (orderItems) => {
                let name = orderItems?.map((i) => i.name)?.join(", ");
                return name;
            },
        },
        {
            title: "Hình ảnh sản phẩm",
            align: "left",
            with: "20%",
            dataIndex: "orderItems",
            render: (orderItems) => {
                return orderItems?.map((e) => (
                    <img
                        style={{
                            width: "30px",
                            height: "auto",
                        }}
                        src={e.image}
                    />
                ));
            },
        },
        {
            title: "Số lượng",
            align: "center",
            with: "10%",
            dataIndex: "orderItems",
            render: (orderItems) => {
                let total = 0;
                orderItems?.map((e) => {
                    total += e.qty;
                });
                return total;
            },
        },
        {
            title: "Tổng tiền",
            align: "center",
            with: "10%",
            dataIndex: "totalPrice",
            render: (totalPrice) => {
                return VND.format(totalPrice);
            },
        },
        {
            title: "Thời gian đặt hàng",
            align: "center",
            with: "10%",
            dataIndex: "createdAt",
            render: (createdAt) => {
                return createdAt ? dayjs(createdAt).format("DD/MM/YYYY") : "";
            },
        },
        {
            title: "Thông tin người đặt",
            align: "left",
            with: "15%",
            dataIndex: "shippingAddress",
            render: (shippingAddress) => {
                const { name, phone, detail, ward, district, province } =
                    shippingAddress;
                return (
                    <span>
                        {`${name}, SDT: ${phone}, Địa chỉ: ${detail} ${ward} ${district} ${province}`}
                    </span>
                );
            },
        },
        {
            title: "Hình thức thanh toán",
            align: "center",
            with: "10%",
            dataIndex: "paymentMethod",
            render: (paymentMethod) => {
                return paymentMethod === "payLater" ? "Tiền mặt" : "Online";
            },
        },
        {
            title: "Tình trạng",
            align: "center",
            with: "10%",
            dataIndex: "status",
            render: (status) => {
                return status === "shipping"
                    ? "Xác nhận và vận chuyển"
                    : "Chưa xác nhận";
            },
        },
    ];

    const handleClick = () => {
        const excel = new Excel();
        excel
            .addSheet("sheet1")
            .addColumns(column)
            .addDataSource(valuePage?.order?.list, {
                str2Percent: true,
            })
            .saveAs("DoanhThu.xlsx");
    };

    const ChangeData = (list) => {
        if (!list) return;
        const lengthTotal = list?.length;
        const data = [];
        const offline = list.filter((e) => e.paymentMethod == "payLater");
        if (offline) {
            data.push({ type: "Tiền mặt", value: offline?.length });
            data.push({ type: "Online", value: lengthTotal - offline?.length });
        }
    };

    const config = {
        appendPadding: 10,
        data: ChangeData(valuePage?.order?.list),
        angleField: "value",
        colorField: "type",
        radius: 0.9,
        label: {
            type: "inner",
            offset: "-30%",
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 14,
                textAlign: "center",
            },
        },
        interactions: [
            {
                type: "element-active",
            },
        ],
    };

    return (
        <div
            style={{
                padding: "20px",
            }}
        >
            <Form form={form}>
                <Row>
                    <Col span={4}>
                        <FormItem label="Ngày bắt đầu" name={"start"}>
                            <DatePicker
                                format={"YYYY-MM-DD"}
                                onChange={(date, dateString) => {
                                    setDateSearch((pre) => ({
                                        ...pre,
                                        start: dateString,
                                    }));
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <FormItem label="Ngày kết thúc" name={"end"}>
                            <DatePicker
                                format={"YYYY-MM-DD"}
                                onChange={(date, dateString) => {
                                    setDateSearch((pre) => ({
                                        ...pre,
                                        end: dateString,
                                    }));
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <Button
                            type="primary"
                            onClick={() => {
                                if (dateSearch.start && dateSearch?.end) {
                                    setSubmit((pre) => pre + 1);
                                } else {
                                    message.error("No time search");
                                }
                            }}
                        >
                            Tra cứu thông kê
                        </Button>
                    </Col>
                </Row>
            </Form>
            <div
                style={{
                    width: "100%",
                    background: "#fff",
                    borderRadius: "10px",
                }}
            >
                <Row
                    style={{
                        padding: "10px",
                        borderRadius: "10px",
                    }}
                    gutter={[16, 16]}
                >
                    <Col span={6}>
                        <div
                            style={{
                                background: "rgb(27, 146, 246)",
                                display: "flex",
                                flexDirection: "column",
                                color: "#fff",
                                padding: "20px",
                                gap: "10px",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "600",
                                }}
                            >
                                Tổng sản phẩm trong cửa hàng
                            </span>
                            <span>
                                <strong style={{ marginRight: 10 }}>
                                    {valuePage?.product?.length}
                                </strong>
                                Sản phẩm
                            </span>
                        </div>
                    </Col>

                    <Col span={6}>
                        <div
                            style={{
                                background: "rgb(139, 198, 62)",
                                display: "flex",
                                flexDirection: "column",
                                color: "#fff",
                                padding: "20px",
                                gap: "10px",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "600",
                                }}
                            >
                                Tổng số khách hàng của hệ thống
                            </span>
                            <span>
                                <strong style={{ marginRight: 10 }}>
                                    {valuePage?.user?.length}
                                </strong>
                                khách hàng
                            </span>
                        </div>
                    </Col>

                    <Col span={6}>
                        <div
                            style={{
                                background: "rgb(151, 71, 255)",
                                display: "flex",
                                flexDirection: "column",
                                color: "#fff",
                                padding: "20px",
                                gap: "10px",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "600",
                                }}
                            >
                                Tổng sản đơn đặt hàng của hệ thống
                            </span>
                            <span>
                                <strong style={{ marginRight: 10 }}>
                                    {valuePage?.order?.length}
                                </strong>
                                Sản phẩm
                            </span>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div
                            style={{
                                background: "rgb(255, 153, 0)",
                                display: "flex",
                                flexDirection: "column",
                                color: "#fff",
                                padding: "20px",
                                gap: "10px",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "600",
                                }}
                            >
                                Tổng sản đơn đặt thành công
                            </span>
                            <span>
                                <strong style={{ marginRight: 10 }}>
                                    {handleFillStatus(
                                        valuePage?.order?.list,
                                        "status",
                                        "shipping"
                                    )}
                                </strong>
                                Sản phẩm
                            </span>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div
                            style={{
                                background: "rgb(228, 84, 84)",
                                display: "flex",
                                flexDirection: "column",
                                color: "#fff",
                                padding: "20px",
                                gap: "10px",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "600",
                                }}
                            >
                                Tổng doanh thu
                            </span>
                            <span>
                                <strong style={{ marginRight: 10 }}>
                                    {VND.format(
                                        handleTotal(valuePage?.order?.list)
                                    )}
                                </strong>
                            </span>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div
                            style={{
                                background: "rgb(170, 101, 80)",
                                display: "flex",
                                flexDirection: "column",
                                color: "#fff",
                                padding: "20px",
                                gap: "10px",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "600",
                                }}
                            >
                                Thanh toán sau khi nhận hàng
                            </span>
                            <span>
                                <strong style={{ marginRight: 10 }}>
                                    {handleFillStatus(
                                        valuePage?.order?.list,
                                        "paymentMethod",
                                        "payLater"
                                    )}
                                </strong>
                                Sản phẩm
                            </span>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div
                            style={{
                                background: "#00684A",
                                display: "flex",
                                flexDirection: "column",
                                color: "#fff",
                                padding: "20px",
                                gap: "10px",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "600",
                                }}
                            >
                                Thanh toán online
                            </span>
                            <span>
                                <strong style={{ marginRight: 10 }}>
                                    {handleFillStatus(
                                        valuePage?.order?.list,
                                        "paymentMethod",
                                        "payOnline"
                                    )}
                                </strong>
                                Sản phẩm
                            </span>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div
                            style={{
                                background: "#FB684A",
                                display: "flex",
                                flexDirection: "column",
                                color: "#fff",
                                padding: "20px",
                                gap: "10px",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "600",
                                }}
                            >
                                Sản phẩm bán chạy
                            </span>
                            <span>
                                <strong style={{ marginRight: 10 }}></strong>
                            </span>
                        </div>
                    </Col>
                </Row>
            </div>
            <div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <span
                        style={{
                            float: "left",
                            fontSize: "18px",
                            fontWeight: "600",
                            padding: "10px 0px",
                        }}
                    >
                        Danh sách đơn hàng trong hệ thống
                    </span>
                    <Button
                        onClick={() => {
                            handleClick();
                        }}
                        type="primary"
                    >
                        Xuất excel
                    </Button>
                </div>
                <Table
                    columns={column}
                    dataSource={valuePage?.order?.list}
                    pagination={{
                        total: valuePage?.order?.length,
                        pageSize: 50,
                    }}
                />
            </div>
        </div>
    );
}
