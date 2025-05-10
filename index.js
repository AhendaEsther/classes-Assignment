FeatureToggle(featureName, isEnabled, userGroupAccess) 
{
    this.featureName = featureName;
    this.isEnabled = isEnabled;
    this.userGroupAccess = userGroupAccess;
  }
  FeatureToggle.prototype.canAccess = function(Role) {
    return this.isEnabled && this.userGroupAccess.includes(Role);
  };
  FeatureToggle.prototype.toggleFeature = function(flag) {
    this.isEnabled = !!flag;
  };
  const newDashboard = new FeatureToggle("NewDashboard", false, ["betaTesters", "admins"]);
  newDashboard.toggleFeature(true);
  function simulateAccessIfElse(featureToggle, userRole) {
    if (featureToggle.canAccess(userRole)) {
      console.log(`Access granted to ${userRole} for feature ${featureToggle.featureName}.`);
    } else {
      console.log(`Access denied to ${userRole} for feature ${featureToggle.featureName}.`);
    }
  }
  function simulateAccessSwitch(featureToggle, userRole) {
    switch (userRole) {
      case "admins":
      case "betaTesters":
      case "earlyAccessUsers":
        if (featureToggle.canAccess(userRole)) {
          console.log(`Access granted to ${userRole} for feature ${featureToggle.featureName}.`);
        } else {
          console.log(`Access denied to ${userRole} for feature ${featureToggle.featureName}.`);
        }
        break;
      default:
        console.log(`Access denied to ${userRole} for feature ${featureToggle.featureName}.`);
    }
  }
  simulateAccessIfElse(newDashboard, "admins");
  simulateAccessIfElse(newDashboard, "regularUsers");
  simulateAccessSwitch(newDashboard, "earlyAccessUsers");
  simulateAccessSwitch(newDashboard, "guest");
// 2.In a freelancer time-tracking platform, create a TimeLog constructor function with properties: freelancerName (string), projectDetails
//  (object with name and hourlyRate), and logs (array of objects with date, hoursWorked), then add prototype methods to calculate total
// earnings, filter logs by date range, and determine if weekly hours exceed 40 using if-else logic.
function TimeLog(freelancerName, projectDetails, logs) {
    this.freelancerName = freelancerName;
    this.projectDetails = projectDetails;
    this.logs = logs || [];
  }
  TimeLog.prototype.calculateTotalEarnings = function() {
    let totalHours = this.logs.reduce((sum, log) => sum + log.hoursWorked, 0);
    return totalHours * this.projectDetails.hourlyRate;
  };
  TimeLog.prototype.filterLogsByDateRange = function(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return this.logs.filter(log => {
      const logDate = new Date(log.date);
      return logDate >= start && logDate <= end;
    });
  };
  TimeLog.prototype.isWeeklyHoursExceeded = function(weekStartDate) {
    const start = new Date(weekStartDate);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    let weeklyHours = 0;
    for (let i = 0; i < this.logs.length; i++) {
      const logDate = new Date(this.logs[i].date);
      if (logDate >= start && logDate <= end) {
        weeklyHours += this.logs[i].hoursWorked;
      }
    }
    if (weeklyHours > 40) {
      return true;
    } else {
      return false;
    }
  };
  const project = {
    name: "Website Redesign",
    hourlyRate: 50
  };
  const logs = [
    { date: "2025-05-01", hoursWorked: 8 },
    { date: "2025-05-02", hoursWorked: 7 },
    { date: "2025-05-03", hoursWorked: 9 },
    { date: "2025-05-04", hoursWorked: 6 },
    { date: "2025-05-06", hoursWorked: 4 },
    { date: "2025-05-07", hoursWorked: 3 }
  ];
  const freelancerTimeLog = new TimeLog("Alicia Ouma", project, logs);
  console.log("Total Earnings: $", freelancerTimeLog.calculateTotalEarnings());
  const filteredLogs = freelancerTimeLog.filterLogsByDateRange("2025-05-02", "2025-05-05");
  console.log("Filtered Logs:", filteredLogs);
  const exceeded = freelancerTimeLog.isWeeklyHoursExceeded("2025-05-01");
  console.log("Weekly hours exceeded 40", exceeded);
//   3. You are developing a startup’s order management system where an Order constructor function should contain customer (object with name and email),
// items (array of objects with productName, quantity, and unitPrice), and status (string), then implement prototype methods to compute total cost,
//  update order status based on payment, and categorize order urgency using switch and conditional statements.
function Order(customer, items, status) {
    this.customer = customer;
    this.items = items;
    this.status = status;
  }
  Order.prototype.computeTotalCost = function() {
    return this.items.reduce((total, item) => {
      return total + item.quantity * item.unitPrice;
    }, 0);
  };
  Order.prototype.updateStatus = function(paymentReceived) {
    if (paymentReceived) {
      this.status = "paid";
    } else {
      this.status = "pending";
    }
  };
  Order.prototype.categorizeUrgency = function() {
    const totalCost = this.computeTotalCost();
    switch (this.status) {
      case "pending":
        if (totalCost > 1000) {
          return "High urgency - pending large order";
        } else if (totalCost > 500) {
          return "Medium urgency - pending moderate order";
        } else {
          return "Low urgency - pending small order";
        }
      case "paid":
        if (totalCost > 1000) {
          return "High urgency - paid large order";
        } else if (totalCost > 500) {
          return "Medium urgency - paid moderate order";
        } else {
          return "Low urgency - paid small order";
        }
      case "shipped":
        return "Order shipped - no urgency";
      case "cancelled":
        return "Order cancelled - no urgency";
      default:
        return "Unknown status - check order";
    }
  };
  const customer = {
    name: "Margaret David",
    email: "margaretdavid@gmail.com"
  };
  const items = [
    { productName: "Smartphone", quantity: 5, unitPrice: 1000 },
    { productName: "Headphones", quantity: 3, unitPrice: 50 }
  ];
  const order = new Order(customer, items, "pending");
  console.log("Total Cost: $", order.computeTotalCost());
  order.updateStatus(true);
  console.log("Updated Status:", order.status);
  console.log("Order Urgency:", order.categorizeUrgency());
    

//   5.Build a simple e-learning system where a Course class has properties: title (string), instructor (object with name and expertise), and students
//  (array of objects with name and completionStatus), then add prototype methods to return names of students who completed the course, count enrolled
// students by expertise area, and use control flow to output different messages for instructors with more or less than 5 students
function Course(title, instructor, students) {
    this.title = title;
    this.instructor = instructor;
    this.students = students || [];
  }
  Course.prototype.getCompletedStudents = function() {
    return this.students
      .filter(student => student.completionStatus === true)
      .map(student => student.name);
  };
  Course.prototype.countStudentsByExpertise = function(expertiseArea) {
    if (this.instructor.expertise === expertiseArea) {
      return this.students.length;
    }
    return 0;
  };
  Course.prototype.instructorMessage = function() {
    const numStudents = this.students.length;
    if (numStudents > 5) {
      return `Instructor ${this.instructor.name} is teaching a large class of ${numStudents} students.`;
    } else if (numStudents > 0) {
      return `Instructor ${this.instructor.name} has a small class of ${numStudents} students.`;
    } else {
      return `Instructor ${this.instructor.name} currently has no students enrolled.`;
    }
  };
  const instructor = {
    name: "Trainer Eunice Aluoch",
    expertise: "Computer Science"
  };
  const students = [
    { name: "Chris", completionStatus: true },
    { name: "Esther", completionStatus: false },
    { name: "Ben", completionStatus: true },
    { name: "Nancy", completionStatus: true },
    { name: "Khembo", completionStatus: false },
    { name: "Hani", completionStatus: true }
  ];
  const course = new Course("Intro to Programming", instructor, students);
  console.log("Students who completed the course:", course.getCompletedStudents());
  console.log("Number of students by expertise 'Computer Science':", course.countStudentsByExpertise("Computer Science"));
  console.log(course.instructorMessage());
