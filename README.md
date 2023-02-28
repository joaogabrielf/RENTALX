# Cadastro de carro

**RF** => Requisitos funcionais
It must be possible to register a new car.

**RNF** => Requisitos não funcionais

**RN** => Regras de negócio
It must not be possible to register a car with a existing license plate.
It must not be possible to update the license plate from an existing car.
By default the registered car must be available.
Only admin users shoud be able to register a new car.

# Listagem de carros

**RF**
It must be to list all available cars
It must be possible to list all available cars by category
It must be possible to list all available cars by brand
It must be possible to list all available cars by car's name

**RN**
User is not required to be logged to list the cars.

# Cadastro de Especificação no carro

**RF**
It must be possible to register a car specification
It must be possible to list all specifications
It must be to list all available cars

**RN**
It must not be possible to register a specification from nonexistent car
It must not be possible to register another specification for the same car
Only admin users shoud be able to register a new specification.

# Cadastro de imagens do carro

**RF**
It must be possible to register photos of the car
It must be possible to list all cars

**RNF**
Use multer to upload files

**RN**
User must be able to register multiple photos of the same car
Only admin users shoud be able to register a new photo.

# Aluguel de carro

**RF**
It must be possible to register a new rent

**RNF**

**RN**
The minimum rent duration must be 24 hours
It must not be possible to register a new rent for some unavailable car
It must not be possible to register a new rent for some user that is already renting