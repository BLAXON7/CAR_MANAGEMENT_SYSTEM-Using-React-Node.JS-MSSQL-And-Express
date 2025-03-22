-- Database Schema for Car Rental System with Improvements

CREATE TABLE Users (
    userID INT IDENTITY(1,1) PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phoneNumber VARCHAR(15) NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    profilePic VARCHAR(500),
    createdAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Cars (
    carID INT IDENTITY(1,1) PRIMARY KEY,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    vin VARCHAR(50) UNIQUE NOT NULL,
    dailyRate DECIMAL(10,2) NOT NULL,
    availability BIT DEFAULT 1
);

CREATE TABLE CarRentals (
    rentalID INT IDENTITY(1,1) PRIMARY KEY,
    userID INT FOREIGN KEY REFERENCES Users(userID),
    carID INT FOREIGN KEY REFERENCES Cars(carID),
    rentalDate DATETIME DEFAULT GETDATE(),
    returnDate DATETIME NULL,
    totalAmount DECIMAL(10,2) NULL,
    status VARCHAR(20) CHECK (status IN ('Booked', 'Active', 'Completed', 'Cancelled')) DEFAULT 'Booked'
);

CREATE TABLE Ratings (
    ratingID INT IDENTITY(1,1) PRIMARY KEY,
    userID INT FOREIGN KEY REFERENCES Users(userID),
    carID INT FOREIGN KEY REFERENCES Cars(carID),
    rating DECIMAL(2,1) CHECK (rating BETWEEN 1.0 AND 5.0),
    comment TEXT NULL,
    createdAt DATETIME DEFAULT GETDATE()
);

-- Indexing for performance
CREATE INDEX idx_user_email ON Users(email);
CREATE INDEX idx_car_vin ON Cars(vin);
CREATE INDEX idx_rental_user ON CarRentals(userID);

-- Stored Procedure: User Login with Error Handling
CREATE PROCEDURE LoginUser @Email VARCHAR(100), @PasswordHash VARCHAR(255)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Users WHERE email = @Email)
    BEGIN
        RAISERROR ('User not found.', 16, 1);
        RETURN;
    END
    
    IF EXISTS (SELECT 1 FROM Users WHERE email = @Email AND passwordHash = @PasswordHash)
        SELECT userID, firstName, lastName FROM Users WHERE email = @Email;
    ELSE
        RAISERROR ('Invalid credentials.', 16, 1);
END;

-- Stored Procedure: Book a Car with Availability Check
CREATE PROCEDURE BookCar @UserID INT, @CarID INT, @ReturnDate DATETIME
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Cars WHERE carID = @CarID AND availability = 1)
    BEGIN
        RAISERROR ('Car is not available.', 16, 1);
        RETURN;
    END
    
    INSERT INTO CarRentals (userID, carID, returnDate, status)
    VALUES (@UserID, @CarID, @ReturnDate, 'Booked');
    
    UPDATE Cars SET availability = 0 WHERE carID = @CarID;
END;

-- Stored Procedure: Return a Car & Calculate Payment
CREATE PROCEDURE ReturnCar @RentalID INT
AS
BEGIN
    DECLARE @CarID INT, @UserID INT, @RentalDate DATETIME, @ReturnDate DATETIME, @DailyRate DECIMAL(10,2), @TotalAmount DECIMAL(10,2);
    
    SELECT @CarID = carID, @UserID = userID, @RentalDate = rentalDate, @DailyRate = dailyRate
    FROM CarRentals CR INNER JOIN Cars C ON CR.carID = C.carID
    WHERE rentalID = @RentalID AND status = 'Active';
    
    IF @CarID IS NULL
    BEGIN
        RAISERROR ('Invalid rental or already completed.', 16, 1);
        RETURN;
    END
    
    SET @ReturnDate = GETDATE();
    SET @TotalAmount = DATEDIFF(DAY, @RentalDate, @ReturnDate) * @DailyRate;
    
    UPDATE CarRentals SET returnDate = @ReturnDate, totalAmount = @TotalAmount, status = 'Completed' WHERE rentalID = @RentalID;
    UPDATE Cars SET availability = 1 WHERE carID = @CarID;
END;

-- Reporting: Get Total Revenue & Active Rentals
CREATE PROCEDURE GetRentalReport
AS
BEGIN
    SELECT 
        (SELECT COUNT(*) FROM CarRentals WHERE status = 'Active') AS activeRentals,
        (SELECT SUM(totalAmount) FROM CarRentals WHERE status = 'Completed') AS totalRevenue;
END;

-- Reporting: Top 5 Cars by Rating
CREATE PROCEDURE GetTopRatedCars
AS
BEGIN
    SELECT C.carID, C.make, C.model, AVG(R.rating) AS avgRating
    FROM Ratings R
    INNER JOIN Cars C ON R.carID = C.carID
    GROUP BY C.carID, C.make, C.model
    ORDER BY avgRating DESC
    OFFSET 0 ROWS FETCH NEXT 5 ROWS ONLY;
END;

