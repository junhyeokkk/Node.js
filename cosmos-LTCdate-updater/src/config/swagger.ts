import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Excel Updater API',
      version: '0.0.1',
      description: 'Excel Updater API 문서',
    },
    servers: [
      {
        url: 'http://localhost:3000', // 추후 배포시 실제 서버 URL로 수정
      },
    ],
  },
  apis: ['src/routes/*.ts', 'src/controllers/*.ts'], // 주석을 읽어올 파일 경로
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
