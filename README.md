# Dream Journal Project Overview
## Introduction
#### The Dream Journal project is an innovative website designed for users to record and monitor their dreams. It serves as a digital platform for cataloging dream experiences, offering unique functionalities and a user-friendly interface.

## Key Features
#### User Authentication: The website provides secure login and signup options, ensuring user privacy and data security.
#### Dream Entry Creation: Once logged in, users can create a new entry to document their dreams. This feature is essential for maintaining a daily dream log.
#### Dream Logs Viewing: Users can view all their past entries on the Dream Logs page, allowing them to reflect on their previous dreams.
#### Handwritten Note Conversion: A standout feature where users can write their dreams on paper and then convert these handwritten notes into digital entries using our platform.
#### Mental Health Monitoring: An innovative background process that monitors patterns in dream entries. If continuous nightmares are detected, the system proactively sends a notification to the user, suggesting they take care of their mental health.

## Technical Specifications
#### Frontend Development: The user interface is developed using React.js, offering a responsive and interactive experience.
#### Deployment: The application is hosted on Amazon EC2, ensuring reliable access and scalability.
#### Backend Development: The backend is built using Python and AWS Lambda Functions, providing a robust and efficient server-side solution.
#### API Gateway Integration: Most Lambda functions are triggered through API Gateway, streamlining the communication between the frontend and backend.
#### EventBridge Scheduling: A unique Lambda function is scheduled via EventBridge to run every minute (ideal for a real-world scenario of every 6 hours) to check for continuous nightmares and trigger user notifications.
#### Handwritten Notes Conversion: Amazon Textract is employed for its exceptional ability to convert handwritten notes into digital text, integrating smoothly with Lambda for seamless data processing.
## Conclusion
#### The Dream Journal project is a comprehensive solution for individuals seeking to document and analyze their dreams. It combines modern web technologies and cloud services to offer a unique platform that is not only about recording dreams but also caring for the user's mental well-being.