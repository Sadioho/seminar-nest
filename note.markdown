# NEST JS

## Nest Js là gì?

- Nest Js là một framework để xây dựng các ứng dụng server side bằng Node.js hiệu quả. Sử dụng ngôn ngữ bậc cao của JS là TypeScript kết hợp với các tính chất OOP [hướng đối tượng][object oriented programming], FP [Lập trình chức năng] và FRP [Lập trình phản ứng chức năng].

## Cách tạo new project

```
 npm i -g @nestjs/cli
 nest new project-name
```

#### - Khi tạo thành công ta được 3 file chính cần xem:

1. app.controller.ts: : Chứa các router để xử lý các request và trả về response cho client.
2. app.module.ts: Root module của ứng dụng.
3. app.service.ts: Service chứa các logic mà controller sẽ dùng đến.
4. main.ts: Sử dụng NestFactory để khởi tạo ứng dụng.

## Controller

![controller](https://docs.nestjs.com/assets/Controllers_1.png)

- Controller chịu trách nhiệm xừ lí những request từ client side gửi lên và trả về lại response cho client
- @Controller() có nhiệm vụ liên kết các class Controller đó với request tương ứng.
- Tạo 1 controller :

```
nest g controller users
```

- Bộ decorator trong Nest JS giúp ta có thể thực hiện truy vấn vào các request cũng như xử lý response data trả về cho client

![controller](https://images.viblo.asia/01989a88-739d-407d-8c52-10d8633d8b18.png)

- Đặc biệt Nest cho phép ràng buộc dữ liệu gửi lên từ request giúp ngăn chặn những dữ liệu không hợp lệ trước khi thực hiện xử lý, đó là **DTO** [Data Transfer Object].

## Module

![controller](https://images.viblo.asia/13526c5b-6edc-481e-a040-3e9a0639d178.png)

- Module có nhiệm vụ đóng gói những logic liên quan của các chức năng cần triển khai đến client một cách độc lập. Một module trong Nest là class được define với **@Module ()**. **@Module ()** sẽ cung cấp metadata mà Nest sử dụng để tổ chức cấu trúc ứng dụng. Một file module cơ bản sẽ như sau:

```TypeScript
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

- Trong một module sẽ bao gồm các thành phần chính sau đây:

  - **providers**: Có nhiệm vụ khởi tạo và cung cấp các service mà sẽ được controller trong module sẽ sử dụng đến.
  - **controllers**: Có nhiệm vụ khởi tạo những controller đã được xác định trong module.

  - **imports**: Có nhiệm vụ import những thành phần của một module khác mà module sẽ sử dụng.

  - **exports**: Có nhiệm vụ export các thành phần của provider và các module khác sẻ import để sử dụng.

- Cách tạo 1 module

```
 nest g module users
```

#### **Share Module**

- Bạn có thể chia sẻ bất kì provider nào trong module hiện tại cho các module khác
- Ví dụ bạn có thể chia sẻ UserService cho các module khác sử dụng bằng cách thêm nó vào mảng exports trong users.module.ts như sau.

```TypeScript
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
```

- Sau khi export, các module khác đều có thể import UsersModule và truy cập vào UsersService để sử dụng.

#### **Global Module**

- Nếu bạn không muốn phải import một module nào đó quá nhiều lần thì Nest cung cấp @Global() cho phép bạn sử một module từ module khác mà không cần import. Như vậy chúng ta có thể sử dụng service của các module khác rất dễ dàng phải không. Chỉ cần thêm @Global() như dưới đây là có thể biến nó trở thành global module.

```TypeScript
import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

## Providers

![Providers](https://images.viblo.asia/51c7a63b-07cc-4585-b610-3aa8386c0bd1.png)

- **Provider** là nơi cung cấp các serivce, repositories, factories, helpers,... cho controller trong một module sử dụng. Đây cũng là nơi sẽ chứa những logic xử lý đã được tách biệt với controller. Để tạo ra một provider chúng ta chỉ cần khai báo @Injectable () trước một class đã định nghĩa. Việc sử dụng @Injectable() sẽ cho Nest biết đây là một class thuộc provider. Để tạo ra một service nơi mà chứa các logic xử lý của UserController, chúng ta hãy tạo ra một UserService trong file user.service.ts dưới đây hoặc sử dụng

```
nest g service users
```

```TypeScript
import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(user: User) {
    this.users.push(users);
  }

  findAll(): User[] {
    return this.users;
  }
```

## Middleware

![middleware](https://images.viblo.asia/ae44463f-3823-4768-ab76-cb2aec197a76.png)

- Middleware là 1 function được gọi trước router handler. Middleware có thể truy cập vào đối tượng **request** và **response**, và gọi **next()** để gọi đến **middlewave** tiếp theo trong chu kì request-response của ứng dụng.

#### - Nhiệm vụ middleware

- Thực thi một đoạn code bất kì.
- Thay đổi đối tượng request và response.
- Kết thúc chu kì request-response.
- Gọi middlewave tiếp theo trong chuổi middleware.
- Nếu middlewave hiện tại không kết thúc chu kỳ request-response, thì nó cần phải gọi next() để chuyển quyền điều kiển đến middlewave tiếp theo. Nếu không request sẽ bị treo.

## Pipe

- **Pipe** được định nghĩa là một class được chú thích bởi một **@Injectable()** **decorator**, và **implement** từ **PipeTransform interface**
- **Pipes** thường được sử dụng trong hai trường hợp cơ bản sau:
  - **transformation**: chuyển đổi dữ liệu đầu vào thành dạng dữ liệu mong muốn, ví dụ chuyển đổi từ dạng string sang integer.
  - **validation**: Kiểm tra dữ liệu đầu vào và báo lỗi nếu như dữ liệu đó không thoả mãn điều kiện.
