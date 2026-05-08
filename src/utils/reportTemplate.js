export const generateReportHtml = (userData, progressData) => {
  const { name, email, role } = userData;
  const { modules, overallScore, date } = progressData;

  const moduleRows = modules.map(m => `
    <tr>
      <td>${m.name}</td>
      <td>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width: ${m.progress}%"></div>
        </div>
      </td>
      <td>${m.progress}%</td>
      <td>${m.status}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Student Progress Report</title>
        <style>
          body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            color: #333;
            padding: 40px;
            line-height: 1.6;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #2196F3;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #2196F3;
            margin: 0;
            font-size: 28px;
          }
          .header p {
            margin: 5px 0 0;
            color: #666;
          }
          .user-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            background: #f5f5f5;
            padding: 20px;
            border-radius: 10px;
          }
          .user-info div p {
            margin: 5px 0;
          }
          .user-info span {
            font-weight: bold;
            color: #555;
          }
          .stats-container {
            display: flex;
            justify-content: space-around;
            margin-bottom: 30px;
          }
          .stat-card {
            background: #fff;
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            width: 30%;
          }
          .stat-card h3 {
            margin: 0;
            color: #666;
            font-size: 14px;
            text-transform: uppercase;
          }
          .stat-card p {
            margin: 10px 0 0;
            font-size: 24px;
            font-weight: bold;
            color: #2196F3;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          th {
            background: #2196F3;
            color: white;
            text-align: left;
            padding: 12px;
          }
          td {
            padding: 12px;
            border-bottom: 1px solid #eee;
          }
          .progress-bar-container {
            width: 100px;
            background: #eee;
            height: 10px;
            border-radius: 5px;
            overflow: hidden;
          }
          .progress-bar-fill {
            background: #4CAF50;
            height: 100%;
          }
          .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 12px;
            color: #999;
            border-top: 1px solid #eee;
            padding-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Sign Language Learning Report</h1>
          <p>Generated on ${date}</p>
        </div>

        <div class="user-info">
          <div>
            <p><span>Student Name:</span> ${name}</p>
            <p><span>Email:</span> ${email}</p>
          </div>
          <div>
            <p><span>Role:</span> ${role}</p>
            <p><span>Overall Progress:</span> ${overallScore}%</p>
          </div>
        </div>

        <div class="stats-container">
          <div class="stat-card">
            <h3>Modules Completed</h3>
            <p>${modules.filter(m => m.progress === 100).length}</p>
          </div>
          <div class="stat-card">
            <h3>Avg. Accuracy</h3>
            <p>85%</p>
          </div>
          <div class="stat-card">
            <h3>Learning Streak</h3>
            <p>5 Days</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Module Name</th>
              <th>Visual Progress</th>
              <th>Percentage</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${moduleRows}
          </tbody>
        </table>

        <div class="footer">
          <p>© 2026 Sign Language Learning App. All rights reserved.</p>
          <p>Keep practicing and mastering the signs!</p>
        </div>
      </body>
    </html>
  `;
};
