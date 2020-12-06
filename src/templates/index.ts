export const resultEmail = (employerName: string): string => `
<p>Hi <strong>${employerName}</strong>,</p>
<br/>
<p>Your employee financial wellness survey is ready!
 Visit  this link to check out the results: http://survey.onward.org/.</p>
 <p>Thank you!</p>
 <br/>
 <p>Best,</p>
 <p>The Onward Financial Team.</p>`;

export const surveyInvitation = (
  employerName: string,
  surveyId: string
): string => `<p>Hi!
<br/><br/>
  Your employer ${employerName}
  has requested for you to fill out this brief, 5-minute survey about your financial background.
  Your responses will be kept anonymous and will only be used in a general, company-wide, aggregate data analysis.
  Access your unique survey link <a href="http://localhost:3000/survey/${surveyId}/welcome">here.</a>
<br/>
<br/>Best,<br/>
The Onward Financial Team
</p>`;

export const surveyReminder = (surveyId: string): string => `
<p>Hi! <br/><br/> Please fill out your employee survey using <a href="http://localhost:3000/survey/${surveyId}/welcome">this unique survey link.</a>
    <br/><br/>Sincerely,<br/>The Onward Financial Team</p>
`;
