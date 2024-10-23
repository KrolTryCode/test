# Indanis UI

## Запуск приложения

### Для разработки

Убедитесь, что у вас установлен [NodeJS](https://nodejs.org/en) (при развертывании используется v18),
и [Docker](https://www.docker.com/).

Получите доступ к npm registry Gitlab. Сделать это можно несколькими способами:

1. Можно выполнить команду `npm login --registry=https://gitlab.spbpu.com` и ввести логин и пароль от GitLab
2. Логин с помощью токена GitLab:

Генерация токена: **Preferences** (настройки пользователя) -> **Access Tokens** -> Выберите *read_api*, *read_repository* и *read_registry*
в списке и нажмите *Create personal access token*.

Этот токен необходимо указать в файле .env проекта, после чего выполнить скрипт ```npm run npmrc```

Либо, можно указать этот токен в глобальном конфиге .npmrc (глобальный .npmrc обычно находится в домашней папке
пользователя. Узнать, где находится ваш глобальный конфиг можно через команду ```npm config get globalconfig```.

- Windows:

```
C:\Users\user\.npmrc
или
C:\Users\user\AppData\Roaming\npm\etc\npmrc
```

- Linux: ```/home/serega/.npmrc```.

Пример .npmrc файла с указанным токеном: ```//gitlab.spbpu.com/:_authToken=s3cret-token```.

#### 1. Настройка переменных окружения

В случае первоначальной настройки репозитория продублировать файл [.env.example](./.env.example) и назвать его `.env`

- `CORE_URL` - URL, по которому доступен бэкенд
- `BACKEND_IMAGE` - имя образа бэкенд-приложения для локального запуска
- `NPM_TOKEN` - токен, сгенерированный в gitlab для доступа к registry

#### 2. Установка npm-зависимостей

Если вы не используете глобальный npmrc файл, то для генерации локального (в проекте) .npmrc файла с токеном доступа и
ссылкой на registry необходимо выполнить скрипт ```npm run npmrc```. Перед выполнением скрипта убедитесь, что у вас
указан **NPM_TOKEN** в файле .env

После его выполнения будет доступна установка зависимостей для проекта.

Если используется глобальный конфиг с токеном, то установка пакетов доступна сразу без дополнительных настроек.

```
npm ci
```

#### 3. Обновление backend API

Для генерации API при локальном запуске используется `CORE_URL` из файла `.env`. В общем виде, для генерации будет
использоваться url вида `CORE_URL/v3/api-docs`.
Обновить API можно командой `npm run build:api`.
Для запуска в гитлабе сохранён скрипт `npm run build:api:linux` с параметром  `--url=%ссылка на api-docs%`.

#### 4. Запуск в дев-режиме

Существует два с половиной варианта в зависимости от того, где запущен бэкенд.  
В обоих случаях клиент будет доступен на `localhost:9000`, сервер на `localhost:9000/api`

##### Удаленно развернутый бэкенд

- задать переменной окружения `CORE_URL` значение URL развернутого на удаленном сервере бэкенда,
  например, https://ksrc-dev.spbpu.com
- запустить дев-сервер командой `npm run dev` (или явно `npm run dev:remote`)

##### Локально развернутый бэкенд (image из docker-compose)

- задать переменной окружения `CORE_URL` значение URL развернутого локально бэкенда: `http://host.docker.internal:8080`
- запустить дев-сервер командой `npm run dev` (или явно `npm run dev:remote`)

В переменной окружения `BACKEND_IMAGE` должно быть задано имя образа бэкенда, по
умолчанию - `rg.spbpu.com/customprojects/ksrc/app:latest`. Для скачивания образа необходимо выполнить
команду `docker login` и ввести логин и пароль от GitLab.
Пример: `docker login -u ivan.ivanov@spbpu.com -p yourpassword rg.spbpu.com`

##### Локально разрабатываемый бэкенд (debug из исходников)

- указать в `CORE_URL` URL бэкенда, по умолчанию - `http://host.docker.internal:8080`
- запустить фронтенд с помощью команды `npm run dev:remote`

## Unit tests

### VSCode

Для запуска тестов напрямую через VSCode необходимо установить
расширение [Vitest](https://marketplace.visualstudio.com/items?itemName=vitest.explorer).

Далее необходимо открыть нужный файл с тестами и слева найти кнопку запуска.

Также в боковом меню можно найти вкладку `Testing` и запускать тесты оттуда.

### WebStorm | IntelliJ Idea

Для запуска юнит тестов по отдельности из контекстного меню необходимо настроить шаблоны конфигурации,
выбрав `Edit Configurations...`, затем `Edit configuration templates...` в левом нижнем углу. В появившемся окне
выбрать `Vitest` и в поле `Vitest package` выбрать путь до папки `jest` в `node_modules` (
например `KSRC\ui\node_modules\jest`).

Далее необходимо открыть нужный файл с тестами и слева найти кнопку запуска.

Если необходимо запускать все тесты приложения, необходимо создать новую конфигурацию запуска `Vitest`,
выбрав `All tests`.

### Командная строка

Для запуска через командную строку можно использовать:

- `npm run test` - для единичного запуска всех тестов
- `npm run test:verbose` - для более детальной информации
- `npm run test:ui` - для просмотра более детальной информации и прогресса тестов в браузере (страница откроется сама).
  На ней также можно [посмотреть покрытие](https://vitest.dev/guide/coverage#vitest-ui)
- `npm run test:coverage` - тесты с покрытием, см. папку `coverage`

## Статический анализ

Для проверки соответствия кода некоторым стандартам используется команда `npm run lint`, включающая в себя проверку
ts-кода и стилей.

### Typescript

Команда: `npm run lint:eslint`  
Конфиг: [.eslintrc.json](./.eslintrc.json)

### Стили

Команда: `npm run lint:styles`  
Конфиг: [.stylelintrc.json](./.stylelintrc.json)

В случае обновлений конфига для удобства применения изменений можно
использовать [интерактивную утилиту](https://github.com/mizdra/eslint-interactive)

#### styled components

Если про *.scss файлы сказать особо нечего, то для работы со styled components есть пара моментов:

- нужно, чтобы файлы с ними заканчивались на `style.ts` (e.g. `tasks.style.ts`)
- [vscode]:
  - в settings.json нужно добавить `*.style.ts`:
  ```json
    "stylelint.validate": ["css", "scss", "*.style.ts", ...]
  ```
  - [расширение](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components)

### Заметки на будущее

#### Проверки именования файлов

Есть плагин [eslint-plugin-filenames](https://www.npmjs.com/package/eslint-plugin-filenames), но он работает только с
файлами, которые включены в eslint. То есть, плагин не будет проверять именование файлов стилей. Поэтому пока
придерживаемся гайдлайнов по именованию файлов.

#### Можно рассмотреть

- https://github.com/javierbrea/eslint-plugin-boundaries
- https://github.com/amilajack/eslint-plugin-compat

## Именование файлов

Принцип: `file-name[.suffix].ext`

Например,

- `build-ship.component.tsx` - ✅
- `use-ships.hook.ts` - ✅
- `build-ship.module.scss` - ✅
- `utils.ts` - ✅
- `OrderModal.ts` - ⛔
- `SomeStyle.module.scss` - ⛔

Суффиксы помогают отличать сгруппированные по предметной области файлы. Если, например, есть папка hooks, можно не
писать суффикс hook для каждого файла в этой папке.

При выборе суффикса надо ориентироваться на регулярно встречающиеся инфраструктурные единицы кода, например:

- modal.`style.ts` - ✅ компоненты, стилизованные через `styled-components`
- login-form.`component.tsx` - ✅ React-компонент
- admin.`module.scss` - ✅ scss-модуль
- ✅ `hook`, `test`, `dto` и т.п.
- `app.routes.ts` - 🤔 описаны один раз, мб разнесены на два-три файла
- `create.account.tsx` - ⛔ аккаунт - это понятие предметной области

Для нижнего регистра есть более-менее объективная причина - windows и, вроде, macOS не чувствительны к регистру в именах
файлов, а линуксы чувствительны, поэтому во избежание потенциальных проблем (шанс невелик, но все же) имеет смысл свести
все названия к одному регистру (нижнему) - но в основном, просто чтобы было красиво и единообразно.

## Обновление словаря

Словарь хранится в properties-файлах в проекте [indanis_app](https://gitlab.spbpu.com/customprojects/indanis/app) по
пути ```app/src/main/resources/i18n/[Resource Bundle 'ui_messages']/ui_messages.properties```
Для обновления словаря требуется включить в настройках IDE следующие параметры:

- Указать ```default encoding for properties files```: ```UTF-8```
- Включить параметр ```Transparent native-to-ascii conversion``` - для Intellij IDEA, автоматическая конвертация для
  файлов properties. [Расширение для VSCode](https://marketplace.visualstudio.com/items?itemName=cwan.native-ascii-converter)

Скрипты для работы со словарем:

- Для обеспечения бэкенда свежими переводами использовать:
  - ```npm run dictionary:build``` - запускает скрипт для парсинга словарей UI и трансформации их из .json в .properties Resource Bundle файлы
  - ```npm run dictionary:remove``` - удаляет сгенерированные переводы .properties

Сгенерированные файлы необходимо вручную добавить в проект [indanis_app](https://gitlab.spbpu.com/customprojects/indanis/app)

- Для поддержания актуальности переводов на UI следует
  пользоваться [специальной библиотекой i18n-unused](https://www.npmjs.com/package/i18n-unused):
  - ```npm run dictionary:unused``` - скрипт печатает в консоль все неиспользуемые переводы (для каждого словаря отдельно)
  - ```npm run dictionary:mark``` - скрипт добавляет приставку *[UNUSED]* перед всеми неиспользуемыми ключами в словарях
  - ```npm run dictionary:missed``` - скрипт печатает в консоль отсутствующие ключи в словарях

P.S.: Пользоваться библиотекой с особой внимательностью - возможны ошибки в работе (и ошибочные [UNUSED] приставки), так
как библиотека не учитывает все кейсы использования i18n (например, если ключ для перевода передается в другой компонент
через пропсы, минуя t, или как в следующем примере)
```
  const a = { name: 'TREE.DATA' };
  const name = t(a.name);
```


