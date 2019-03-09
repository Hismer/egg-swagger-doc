export default {
  // 使用 mockjs 等三方库
  "GET /swagger.json": {
    host: "",
    swagger: "2.0",
    basePath: "/api/iot/v1",
    info: {
      title: "vod-iot-api",
      description:
        "##### 多唱数据中心 Iot 服务, 包含数据中心设备管理相关接口\n\n- 调试环境: https://vod-dev.duochang.cc\n- 正式环境: https://vod.duochang.cc\n\n> 所有接口均遵循 RESTful 原则设计\n> 预发布环境，测试环境域名均与正式环境相同\n\n##### 测试环境和预发布环境均需要在请求 Header 中添加：\n\n- 测试环境：X-Ca-Stage:TEST\n- 预发环境：X-Ca-Stage:PRE\n",
      version: "0.0.1"
    },
    schemes: ["http", "https"],
    tags: [
      { name: "产品", description: "" },
      { name: "凭据", description: "" },
      { name: "令牌", description: "" }
    ],
    paths: {
      "/products": {
        post: {
          tags: ["产品"],
          summary: "创建产品资源 ",
          description: "",
          operationId: "controller-products-create",
          consumes: ["application/json"],
          produces: ["application/json"],
          parameters: [
            {
              in: "header",
              type: "string",
              name: "Authorization",
              required: false,
              description: "授权凭据 "
            },
            {
              in: "header",
              type: "string",
              name: "X-Ca-Stage",
              required: false,
              description: "制定请求环境 "
            },
            {
              in: "body",
              schema: { $ref: "#/definitions/ProductCreate" },
              name: "body",
              required: true,
              description: ""
            }
          ],
          security: [],
          responses: {
            "201": {
              schema: { $ref: "#/definitions/ProductShow" },
              description: "产品对象 "
            },
            "400": {
              schema: { $ref: "#/definitions/Exception" },
              description: "校验失败 "
            }
          },
          deprecated: false
        }
      },
      "/products/{id}": {
        put: {
          tags: ["产品"],
          summary: "更新产品资源 ",
          description: "",
          operationId: "controller-products-update",
          consumes: ["application/json"],
          produces: ["application/json"],
          parameters: [
            {
              in: "header",
              type: "string",
              name: "Authorization",
              required: false,
              description: "授权凭据 "
            },
            {
              in: "header",
              type: "string",
              name: "X-Ca-Stage",
              required: false,
              description: "制定请求环境 "
            },
            {
              in: "path",
              type: "string",
              name: "id",
              required: true,
              description: "产品型号 "
            },
            {
              in: "body",
              schema: { $ref: "#/definitions/ProductEdit" },
              name: "body",
              required: true,
              description: ""
            }
          ],
          security: [],
          responses: {
            "204": {
              schema: { $ref: "#/definitions/ProductShow" },
              description: "产品对象 "
            },
            "400": {
              schema: { $ref: "#/definitions/Exception" },
              description: "校验失败 "
            }
          },
          deprecated: false
        }
      },
      "/sts": {
        post: {
          tags: ["凭据"],
          summary: "创建资源临时授权凭据 ",
          description: "",
          operationId: "controller-sts-create",
          consumes: ["application/json"],
          produces: ["application/json"],
          parameters: [
            {
              in: "body",
              type: "string",
              name: "body",
              required: true,
              description: "策略名称 "
            },
            {
              in: "body",
              type: "string",
              name: "body",
              required: true,
              description: "产品名 "
            },
            {
              in: "body",
              type: "string",
              name: "body",
              required: true,
              description: "设备序列号 "
            }
          ],
          security: [],
          responses: {
            "200": {
              schema: { $ref: "#/definitions/credential" },
              description: "授权凭据 "
            },
            "400": {
              schema: { $ref: "#/definitions/Exception" },
              description: "签名校验不正确 "
            },
            "403": {
              schema: { $ref: "#/definitions/Exception" },
              description: "出货验证失败 "
            },
            "412": {
              schema: { $ref: "#/definitions/Exception" },
              description: "产品型号不存在 "
            }
          },
          deprecated: false
        }
      },
      "/token": {
        post: {
          tags: ["令牌"],
          summary: "创建授权凭据 ",
          description: "",
          operationId: "controller-token-create",
          consumes: ["application/json"],
          produces: ["application/json"],
          parameters: [
            {
              in: "header",
              type: "string",
              name: "User-Agent",
              required: true,
              description: "设备头信息 "
            },
            {
              in: "header",
              type: "string",
              name: "Device-Sn",
              required: true,
              description: "设备SN "
            },
            {
              in: "header",
              type: "string",
              name: "Device-Mac",
              required: true,
              description: "设备网卡信息 "
            },
            {
              in: "body",
              type: "string",
              name: "body",
              required: true,
              description: "随机字符串 "
            },
            {
              in: "body",
              type: "integer",
              name: "body",
              required: true,
              description: "时间戳 "
            },
            {
              in: "body",
              type: "string",
              name: "body",
              required: true,
              description: "时间戳签名 "
            }
          ],
          security: [],
          responses: {
            "200": {
              schema: { $ref: "#/definitions/credential" },
              description: "授权凭据 "
            },
            "400": {
              schema: { $ref: "#/definitions/Exception" },
              description: "签名校验不正确 "
            },
            "403": {
              schema: { $ref: "#/definitions/Exception" },
              description: "出货验证失败 "
            },
            "412": {
              schema: { $ref: "#/definitions/Exception" },
              description: "产品型号不存在 "
            }
          },
          deprecated: false
        }
      }
    },
    securityDefinitions: {},
    definitions: {
      Meta: {
        type: "object",
        required: [],
        properties: {
          limit: { type: "integer", example: 1 },
          page: { type: "integer", example: 1 },
          offset: { type: "integer", example: 1 }
        }
      },
      Exception: {
        type: "object",
        required: ["msg"],
        properties: {
          msg: { type: "string", example: "错误提示消息（仅用作DEBUG）" }
        }
      },
      Success: {
        type: "object",
        required: ["msg"],
        properties: { msg: { type: "string", example: "操作执行成功" } }
      },
      Json: { type: "object", required: [], properties: {} },
      devices: {
        type: "object",
        required: ["meta"],
        properties: {
          data: { type: "array", items: { $ref: "#/definitions/device" } },
          meta: { $ref: "#/definitions/meta" }
        }
      },
      device: {
        type: "object",
        required: [
          "sn",
          "os_version",
          "last_login_ipv4",
          "last_login_city_code",
          "last_login_time",
          "is_test",
          "heartbeat_at",
          "is_online",
          "created_at",
          "updated_at"
        ],
        properties: {
          sn: { type: "string", example: "D60" },
          os_version: { type: "string", example: "1.0.0" },
          last_login_ipv4: { type: "string", example: "127.0.0.1" },
          last_login_city_code: { type: "string", example: "xxxxxx" },
          last_login_time: { type: "string", example: "2019-3-6 05:36:00" },
          is_test: { type: "boolean", example: false },
          heartbeat_at: { type: "string", example: "2019-3-6 05:36:00" },
          is_online: { type: "boolean", example: false },
          created_at: { type: "string", example: "2019-3-6 05:36:00" },
          updated_at: { type: "string", example: "2019-3-6 05:36:00" }
        }
      },
      ProductList: {
        type: "object",
        required: ["meta"],
        properties: {
          data: { type: "array", items: { $ref: "#/definitions/device" } },
          meta: { $ref: "#/definitions/meta" }
        }
      },
      ProductShow: {
        type: "object",
        required: [
          "id",
          "name",
          "shipment_verification",
          "created_at",
          "updated_at"
        ],
        properties: {
          id: { type: "string", discription: "设备型号", example: "D60" },
          name: { type: "string", example: "家用D60点歌机" },
          shipment_verification: {
            type: "string",
            discription:
              "设备出货校验模式：ignore 不校验，chip_id 芯片SN校验，motherboard_code 主板SN校验, barcode_num 条形码SN校验",
            example: "ignore"
          },
          created_at: { type: "string", example: "2019-3-6 05:36:00" },
          updated_at: { type: "string", example: "2019-3-6 05:36:00" }
        }
      },
      ProductCreate: {
        type: "object",
        required: ["id", "name", "shipment_verification"],
        properties: {
          id: { type: "string", discription: "设备型号", example: "D60" },
          name: { type: "string", example: "家用D60点歌机" },
          shipment_verification: {
            type: "string",
            discription:
              "设备出货校验模式：ignore 不校验，chip_id 芯片SN校验，motherboard_code 主板SN校验, barcode_num 条形码SN校验",
            example: "ignore"
          }
        }
      },
      ProductEdit: {
        type: "object",
        required: ["name", "shipment_verification"],
        properties: {
          name: { type: "string", example: "家用D60点歌机" },
          shipment_verification: {
            type: "string",
            discription:
              "设备出货校验模式：ignore 不校验，chip_id 芯片SN校验，motherboard_code 主板SN校验, barcode_num 条形码SN校验",
            example: "ignore"
          }
        }
      },
      credential: {
        type: "object",
        required: ["token", "expire"],
        properties: {
          token: { type: "string", example: "JWT字符串" },
          expire: { type: "integer", example: 7200 }
        }
      }
    }
  }
};
