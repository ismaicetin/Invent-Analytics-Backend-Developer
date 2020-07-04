
projede sql yerine mongodb kullandım. 
bilgisayarda mongdbnin kurulması gerekmektedir.
geri kalan db structure nodejs in içindedir otomatik olarak yuklenecektir

projede servisleri basına api konulmuştur

ResponseModify eklentisi ile daha rahat ve her yerden ulaşılabilir serponse json respon donucu oluşturulmuştur.

mongoostaki şemalar birbirleri ile ilişkilidir.

aynı yapı sql ilede kurulabilinir.


servisler asagıda şeildedir 
.get      ('localhost:3000/api/users',                   
.get      ('localhost:3000/api/users/:id',               
.post     ('localhost:3000/api/users',                   
.put      ('localhost:3000/api/user/:id',                
.delete   ('localhost:3000/api/user/:id',                
.post     ('localhost:3000/api/users/:id/borrow/:bookId',
.post     ('localhost:3000/api/users/:id/return/:bookId',
.get      ('localhost:3000/api/books',                   
.get      ('localhost:3000/api/books/:id',               
.post     ('localhost:3000/api/books',                   

kodların içerisinde remove update komutlarıda bulunmaktadır fakar sitemdeki rootlandırmaya eklenmemiştir.

Back-end Developer Case Question 
 
Bir kütüphane için, üyeleri ve kitapların üyeler tarafından ödünç alınması işlemlerini yönetebilmek için bir uygulama geliştirilecektir. 
 
Uygulamanın üzerinden yapılabilecek işlemler aşağıda listelenmiştir: 
 
● Kullanıcıları listeleme ● Bir kullanıcının bilgilerine erişme (ismi, geçmişte ödünç aldığı kitaplar ve mevcut ödünç aldığı kitaplar) ● Yeni kullanıcı oluşturma ● Kitapları listeleme ● Bir kitabın bilgilerine erişme (ismi ve ortalama değerlendirme puanı) ● Yeni kitap oluşturma ● Kitap ödünç alma ● Kitap teslim etme ve değerlendirme puanı verme 
 
Bu gereksinimleri yerine getirmek için Javascript ile Node.js geliştirme ortamında çalışan bir REST API geliştirilmesi beklenmektedir. Geliştirilen uygulamanın, ekteki Postman Collection’ına uygun bir formatta istek alıp yanıt dönmesi gerekmektedir. Collection içinde request / response örnekleri mevcuttur. 
 
Teknik gereksinimler aşağıda listelenmiştir. Çözümün mümkün olduğunca bu gereksinimleri yerine getiriyor olması gerekmektedir.  
 
● REST API Express.js kütüphanesi ile geliştirilmelidir. ● TypeScript ya da ES5+ kullanılabilir. Webpack, babel vb. kütüphaneler kullanılabilir. ● Veritabanı olarak istenilen bir relational database management system kullanılabilir. Veritabanı DDL scriptinin çözüm ile beraber iletilmesi gerekmektedir.  ● Veritabanı işlemleri için bir ORM ya da query builder kütüphanesi kullanılması tercih edilmektedir (örneğin knex, sequelize,  bookshelf, typeorm vb.). ● API isteklerinde gönderilen body’lerin bir validator yardımıyla kontrol edilmesi beklenmektedir (örneğin joi, express-validator, validator.js vb.) ● Hatalı durumlarda (örneğin olmayan bir kullanıcının kitap almaya çalışması, başkası üzerindeki bir kitabın alınmaya çalışılması vb.) uygulamanın hatayı yakalayarak API cevabında bir hata olduğunu belirtmesi gerekmektedir (en azından 500 Internal Server Error). ● Lodash, Underscore.js, moment vb. utility kütüphaneleri gerekirse kullanılabilir. 




ismail çetin