import {
  AccountConfiguration,
  User,
  UserStateEnum,
  UserWithPermissions,
} from '~/api/utils/api-requests';
import { adminRole } from '~/utils/configuration/constants-roles';

export const mockApiClientLogin = vi.fn().mockImplementation((data, params) => {
  return Promise.resolve({
    status: 200,
    data: {
      idToken:
        // eslint-disable-next-line max-len
        'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3YTA2YmFlYS0yY2NkLTQzMTUtODdkYS1mZDIxZjM1Y2JkNDIiLCJpYXQiOjE2OTc2MjgxOTIsIm5iZiI6MTY5NzYyODE5MiwiZXhwIjoxNjk3NzE0NTkyLCJzdWIiOiJzeXN0ZW1fXzVlZjk7F42--ed9LNjuUCPPmKOElv0',
      expiresIn: 86400,
    },
    headers: {
      authorization:
        // eslint-disable-next-line max-len
        'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3YTA2YmFlYS0yY2NkLTQzMTUtODdkYS1mZDIxZjM1Y2JkNDIiLCJpYXQiOjE2OTc2MjgxOTIsIm5iZiI6MTY5NzYyODE5MiwiZXhwIjoxNjk3NzE0NTkyLCJzdWIiOiJzeXN0ZW1fXzVlZjk7F42--ed9LNjuUCPPmKOElv0',
      'content-type': 'application/json',
    },
  });
});

export const mockGetCurrentUser = vi.fn().mockImplementation((data, params) => {
  return Promise.resolve({
    status: 200,
    user: {
      admin: true,
      created: '2023-10-19T19:02:00.988Z',
      email: 'test@email.com',
      firstName: 'test',
      id: 'test-3fa85f64-5717-4562-b3fc-2c963f66afa6',
      lastName: 'systemTest',
      state: UserStateEnum.Active,
    } as UserWithPermissions,
    permissions: [adminRole],
    passwordExpiresSoon: false,
  });
});

export const mockGetUser = vi.fn().mockImplementation((data, params) => {
  return Promise.resolve({
    id: 'test-admin-id-2c963f66afa6',
    email: 'admin@admin.com',
    firstName: 'admin',
    lastName: 'admin',
    createdFrom: '2020-10-19T19:02:00.988Z',
    state: UserStateEnum.Active,
  } as User);
});

export const mockGetAppConfig = vi.fn().mockImplementation((data, params) => {
  return Promise.resolve({
    rootGroupId: '123456-ccww-swsw-deded-y6y6',
    defaultProjectId: '7891011-tgge-88i8i8',
    mainDashboardId: '12131415-4562-b3fc-lod2j9cm',
    userSelfRegistration: true,
  });
});

export const mockCreateAccount = vi.fn().mockImplementation((data, params) => {
  return Promise.resolve({
    status: 200,
    data: {
      email: 'email@test.com',
      firstName: 'firstNameTest',
      lastName: 'secondNameTest',
    },
  });
});

export const mockRegisterAccount = vi.fn().mockImplementation((data, params) => {
  return Promise.resolve({
    status: 200,
    data: {
      username: 'systeMtest',
      password: 'systeMtest',
      activationCode: 'activationTest',
    },
  });
});

export const mockGetCurrentBuildingProgram = vi.fn().mockImplementation((data, params) => {
  return Promise.resolve({
    status: 200,
    data: [
      {
        id: '63f85f164-57d7-4562-b3f0c-2c963f66afa6',
        title: 'titleShip',
        project: {
          id: '3faf64-512717-412562-bafc-2c912636afa6',
          title: 'test',
          groupId: 1,
          groupName: 'groupTest',
          subgroupId: 2,
          subgroupName: 'subGroupTest',
          kindId: 3,
          kindName: 'kindName',
          typeId: '3fa825f64-5d17-45362-b3fc-2c96d36afa6',
          typeName: 'typeName',
          complexityFormulaId: 4,
          complexityK1: 5,
          complexityK2: 6,
          complexityK3: 7,
          metal: 8,
          displacement: 9,
          displacementEmpty: 10,
          length: 11,
          width: 12,
          precipitation: 13,
        },
        authorId: '3faa85f64-5g71d7-4l62-b3lc-2c963f6e6afa6',
        status: 'Built',
        created: '2023-10-21T18:01:31.762Z',
        customer: 'customerTest',
        typeWork: 'typeWorkTest',
        factoryId: '3fa8d5f64-57f7-45f2-b3sc-2c963f6e6afa6',
        factoryTitle: 'factoryTest',
        startDate: '2023-10-21T18:01:31.763Z',
        layingDate: '2023-10-21T18:01:31.763Z',
        launchingDate: '2023-10-21T18:01:31.763Z',
        deliveryDate: '2023-10-21T18:01:31.763Z',
        readinessDegree: 1,
      },
    ],
  });
});

export const mockGetShipJson1 = vi.fn().mockImplementation((data, params) => {
  return Promise.resolve({
    status: 200,
    // eslint-disable-next-line max-len
    data: 'Название,\r\nЗаказчик,Минсельхоз России\r\nСоздан,2023-10-11\r\nСтатус,В постройке\r\nТип работ,Строительство\r\nГруппа,Транспортные суда смешанного и внутреннего плавания\r\nПодгруппа,Грузовые самоходные суда\r\nВид судна,Сухогрузные суда\r\nТип судна,Сухогрузные суда\r\nЗавод-строитель,АО Балтийский завод\r\n"Техготовность, %",30.0\r\nДата начала работ,2021-10-05\r\nДата закладки,2021-10-15\r\n"Трудоемкость К1, тыс. ч-час",0.41\r\n"Трудоемкость К2, тыс. ч-час",0.35\r\n"Трудоемкость К3, тыс. ч-час",0.24\r\n"Водоизмещение, т",60000.0\r\n"Водоизмещение порожнем, т",13000.0\r\n"Длина, м",180.0\r\n"Ширина, м",32.0\r\n"Осадка, м",10.0\r\n"Металлоёмкость, т",9000.0\r\n',
  });
});

export const mockGetTemplates = vi.fn().mockImplementation((data, params) => {
  return Promise.resolve({
    status: 200,
    data: [
      {
        id: 'bc9043a6-08ad-4521-96b5-554f6b11c23a',
        name: 'Name',
        content: 'content',
        state: 'Created',
      },
      {
        id: 'ee9e4e54-cc91-4f9d-9231-7d95b67abeac',
        name: 'confirmationEmail',
        content:
          '<!doctype html><html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Код подтверждения регистрации</title></head><body><div>Ваш код подтверждения: <br><b>${activationCode}</b> <br><a href="${activationUrl}">Или нажмите на эту ссылку</a></div><br/></body></html>',
        state: 'Created',
      },
      {
        id: '916fda01-5a31-410b-8ce5-c88022cb55d0',
        name: 'reactivationEmail',
        content:
          '<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Код реактивации аккаунта</title></head><body><div>Ваш код реактивации: <br><b>${activationCode}</b> <br><a href="${activationUrl}">Или нажмите на эту ссылку</a></div><br/></body></html>',
        state: 'Created',
      },
      {
        id: '8261d4c7-3203-4941-8b01-47e1b4ea49f6',
        name: '1',
        content: 'testtest',
        state: 'Created',
      },
    ],
  });
});

const ShipFactoryTestData = {
  id: '49e0709e-5621-11ee-8c99-0242ac120002',
  title: 'АО Балтийский завод',
  regionId: 1,
  region: 'СЗФО',
  specializationId: 'c5c4c316-561e-11ee-8c99-0242ac120002',
  specialization: 'ССЗ',
  branchId: 'e634563e-561e-11ee-8c99-0242ac120002',
  branch: 'МПТ',
  yearOfCreation: 1856,
  square: 65.0,
  annualCapacity: 60000,
  stuffNumber: 5892,
  opr: 2317,
  slipways: [
    {
      id: '13f5f5d0-56df-11ee-8c99-0242ac120002',
      name: 'Горизонтальный стапель в эллинге',
      typeId: 4,
      type: 'Эллинг',
      factoryId: '49e0709e-5621-11ee-8c99-0242ac120002',
      yearCreation: 1989,
      yearModification: null,
      numberOfStaircases: 1,
      length: 168,
      width: 31,
      height: 23,
      sizeBetweenSlipways: null,
      sizeBetweenAxes: 11.0,
      numberSlipwayLines: 1,
      numberSlipwayPlaces: 1,
      maxLoad: 25.0,
      numberCrane: 0,
      maxLoadCapacityCranes: 320.0,
      lengthGak: 23,
      maxBoatLength: 168.0,
      maxBoatWidth: 30.5,
      maxBoatPrecipitation: null,
      maxWeight: 7000.0,
      description: null,
      parts: [],
    },
    {
      id: '3d21eae4-562c-11ee-8c99-0242ac120002',
      name: 'Открытый продольный наклонный стапель А',
      typeId: 1,
      type: 'Стапель',
      factoryId: '49e0709e-5621-11ee-8c99-0242ac120002',
      yearCreation: 1939,
      yearModification: 1996,
      numberOfStaircases: null,
      length: 263,
      width: 43,
      height: null,
      sizeBetweenSlipways: null,
      sizeBetweenAxes: 7.6,
      numberSlipwayLines: 1,
      numberSlipwayPlaces: 1,
      maxLoad: 150.0,
      numberCrane: 0,
      maxLoadCapacityCranes: 100.0,
      lengthGak: 40,
      maxBoatLength: 320.0,
      maxBoatWidth: 39.0,
      maxBoatPrecipitation: 3.6,
      maxWeight: 35000.0,
      description: null,
      parts: [
        {
          id: '617d4c68-56ee-11ee-8c99-0242ac120002',
          name: 'Причал № 7',
          slipwayId: '3d21eae4-562c-11ee-8c99-0242ac120002',
          length: 210.0,
          width: 25.0,
        },
        {
          id: '7960df98-56ee-11ee-8c99-0242ac120002',
          name: 'Причал № 8',
          slipwayId: '3d21eae4-562c-11ee-8c99-0242ac120002',
          length: 204.0,
          width: 25.0,
        },
        {
          id: '6ab36eaa-562d-11ee-8c99-0242ac120002',
          name: 'Причал № 1',
          slipwayId: '3d21eae4-562c-11ee-8c99-0242ac120002',
          length: 160.0,
          width: 18.3,
        },
        {
          id: 'f4632a58-56ed-11ee-8c99-0242ac120002',
          name: 'Причал № 2',
          slipwayId: '3d21eae4-562c-11ee-8c99-0242ac120002',
          length: 165.7,
          width: 35.3,
        },
        {
          id: '28e280c6-56ee-11ee-8c99-0242ac120002',
          name: 'Причал № 4',
          slipwayId: '3d21eae4-562c-11ee-8c99-0242ac120002',
          length: 148.0,
          width: 10.0,
        },
        {
          id: '0c7b1574-56ee-11ee-8c99-0242ac120002',
          name: 'Причал № 3',
          slipwayId: '3d21eae4-562c-11ee-8c99-0242ac120002',
          length: 275.0,
          width: 10.0,
        },
        {
          id: '4fae60bc-56ee-11ee-8c99-0242ac120002',
          name: 'Причал № 6',
          slipwayId: '3d21eae4-562c-11ee-8c99-0242ac120002',
          length: 170.0,
          width: 14.7,
        },
        {
          id: '3c95f562-56ee-11ee-8c99-0242ac120002',
          name: 'Причал № 5',
          slipwayId: '3d21eae4-562c-11ee-8c99-0242ac120002',
          length: 163.0,
          width: 14.7,
        },
      ],
    },
    {
      id: '75d33cb8-58b0-11ee-8c99-0242ac120002',
      name: 'Открытый продольный наклонный стапель B',
      typeId: 1,
      type: 'Стапель',
      factoryId: '49e0709e-5621-11ee-8c99-0242ac120002',
      yearCreation: 1908,
      yearModification: 2005,
      numberOfStaircases: null,
      length: 263,
      width: 43,
      height: null,
      sizeBetweenSlipways: null,
      sizeBetweenAxes: 7.6,
      numberSlipwayLines: 1,
      numberSlipwayPlaces: 1,
      maxLoad: 90.0,
      numberCrane: 0,
      maxLoadCapacityCranes: 80.0,
      lengthGak: 40,
      maxBoatLength: 240.0,
      maxBoatWidth: 31.0,
      maxBoatPrecipitation: 2.8,
      maxWeight: 12500.0,
      description: null,
      parts: [],
    },
  ],
};

export const mockGetShipFactories = vi.fn().mockImplementation((data, params) => {
  return Promise.resolve({
    status: 200,
    data: [ShipFactoryTestData],
  });
});

export const mockGetShipFactoryJson1 = vi.fn().mockImplementation(() => {
  return Promise.resolve({
    status: 200,
    data: ShipFactoryTestData,
  });
});

const ShipProjectTestData = [
  {
    id: '649598d2-5631-11ee-8c99-0242ac120002',
    title: 'Handysize',
    groupId: 5,
    groupName: 'Транспортные суда смешанного и внутреннего плавания',
    subgroupId: 15,
    subgroupName: 'Грузовые самоходные суда',
    kindId: 25,
    kindName: 'Сухогрузные суда',
    typeId: '1b3f6f1c-5700-11ee-8c99-0242ac120002',
    typeName: 'Сухогрузные суда',
    complexityFormulaId: 26,
    complexityK1: 0.41,
    complexityK2: 0.35,
    complexityK3: 0.24,
    metal: 9000.0,
    displacement: 60000.0,
    displacementEmpty: 13000.0,
    length: 180.0,
    width: 32.0,
    precipitation: 10.0,
  },
  {
    id: '7f32e8ee-577f-11ee-8c99-0242ac120002',
    title: 'ArcticMax',
    groupId: 5,
    groupName: 'Транспортные суда смешанного и внутреннего плавания',
    subgroupId: 15,
    subgroupName: 'Грузовые самоходные суда',
    kindId: 25,
    kindName: 'Сухогрузные суда',
    typeId: '1b3f6f1c-5700-11ee-8c99-0242ac120002',
    typeName: 'Сухогрузные суда',
    complexityFormulaId: 26,
    complexityK1: 0.41,
    complexityK2: 0.35,
    complexityK3: 0.24,
    metal: 15000.0,
    displacement: 100000.0,
    displacementEmpty: 22000.0,
    length: 230.0,
    width: 38.0,
    precipitation: 15.0,
  },
];

export const mockGetShipProjects = vi.fn().mockImplementation(() => {
  return Promise.resolve({
    status: 200,
    data: ShipProjectTestData,
  });
});

export const mockGetShipProjectJson1 = vi.fn().mockImplementation(() => {
  return Promise.resolve({
    status: 200,
    data: ShipProjectTestData[0],
  });
});

export const passwordConfiguration: AccountConfiguration = {
  disablingLoginAttemptsPeriodInSeconds: 180,
  enabledExpirationPassword: true,
  expirationTimeInSeconds: 7776000,
  failedAttemptsLimit: 10,
  isExpirationEnabled: true,
  isLoginAttemptsEnabled: true,
  maxAlphabeticalSequenceLengthPassword: 5,
  maxPasswordLength: 16,
  maxRepeatCharacterLengthPassword: 3,
  minPasswordLength: 8,
  monitoringLoginAttemptsPeriodInSeconds: 60,
  noWhitespacePassword: true,
  passwordExpirationTimeInSeconds: 15552000,
  passwordsCountBeforeRepeatPassword: 5,
  requireDigitPassword: true,
  requireLowercasePassword: true,
  requireSpecialPassword: true,
  requireUppercasePassword: true,
};

export const mockGetPasswordConfiguration = vi.fn().mockImplementation(() => {
  return Promise.resolve({
    status: 200,
    data: passwordConfiguration,
  });
});
