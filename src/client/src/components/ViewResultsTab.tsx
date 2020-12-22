import React from 'react';
import { useQuery } from 'react-query';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import { fetchData, fetchMe } from '../api/userApi';
import VictoryGraph from '../components/VictoryGraph';
import VictoryPie from '../components/VictoryPie';
import auth from '../utils/auth';

/* questions provided by onward */
const q1legend = [
  { name: '1' },
  { name: '2' },
  { name: '3' },
  { name: '4' },
  { name: '5' },
  { name: '6' },
  { name: '7' },
  { name: '8' },
  { name: '9' },
  { name: '10' },
];
const q2legend = [
  { name: 'Never' },
  { name: 'Almost never - a few times a year' },
  { name: 'Sometimes - 1-2 times a month' },
  { name: 'Frequently - at least weekly' },
  { name: 'Almost always - almost everyday, or every day' },
];

/* interfaces below */
interface MyDataResponse {
  _v: number;
  _id: string;
  responses: any;
  surveyId: string;
}

interface MyData extends IAPIResponse {
  data: MyDataResponse[];
}

SwiperCore.use([Navigation, Pagination]);

/* Placeholder Component */
const Placeholder = () => {
  return (
    <p>
      50% of your employees must complete the survey in order to see results.
    </p>
  );
};

/* Data Visualizer Component */
const MyTable = (res: MyData) => {
  const { data } = res;

  // response space array of questions
  // simply marks the frequency
  const responseSpace = [
    [
      { x: '1', y: 0 },
      { x: '2', y: 0 },
      { x: '3', y: 0 },
      { x: '4', y: 0 },
      { x: '5', y: 0 },
      { x: '6', y: 0 },
      { x: '7', y: 0 },
      { x: '8', y: 0 },
      { x: '9', y: 0 },
      { x: '10', y: 0 },
    ],
    [
      { x: 'Never', y: 0 },
      { x: 'Almost never - a few times a year', y: 0 },
      { x: 'Sometimes - 1-2 times a month', y: 0 },
      { x: 'Frequently - at least weekly', y: 0 },
      { x: 'Almost always - almost everyday, or every day', y: 0 },
    ],
    [
      { x: 'Pay with cash or credit card paid in full', y: 0 },
      { x: 'Credit card and pay it off over time', y: 0 },
      { x: 'Money from bank loan', y: 0 },
      { x: 'Use payday loan/overdraft', y: 0 },
      { x: 'Sell something', y: 0 },
      { x: 'Ask for salary advance or loan from workplace', y: 0 },
      { x: 'Other', y: 0 },
      { x: 'Would not be able to pay', y: 0 },
    ],
    [
      { x: 'Did not pay full rent/mortgage', y: 0 },
      { x: 'Skipped paying a bill or paid late', y: 0 },
      { x: 'Skipped essential medical care due to cost', y: 0 },
      { x: 'Could not afford food', y: 0 },
      { x: 'Had credit declined', y: 0 },
      { x: 'Overdraft a bank account', y: 0 },
      { x: 'Borrowed from a payday lender/pawn shop/car title lender', y: 0 },
    ],
  ];

  const responseMeta = [
    {
      totalAnswers: 0,
      title: 'On a scale of 1-10 how would you rate your financial stability?',
    },
    {
      totalAnswers: 0,
      title: 'How often do you worry about your financial situation?',
    },
    {
      totalAnswers: 0,
      title: 'How would you handle an unexpected $400 expense?',
    },
    {
      totalAnswers: 0,
      title:
        'What type(s) of financial hardship have you experienced in the past 6 months?',
    },
  ];

  // response data parser, yikes!
  for (let i = 0; i < data.length; i++) {
    const responses = data[i].responses;
    for (let j = 0; j < responses.length; j++) {
      const question = responses[j];
      const qIndex = j;
      const qNumber = `q${qIndex + 1}`;
      const qResponses = question[qNumber];

      // record user response
      for (let k = 0; k < qResponses.length; k++) {
        const qResponse = (qResponses[k] as string).trim();
        if (!responseSpace[qIndex]) break;
        for (let l = 0; l < responseSpace[qIndex].length; l++) {
          const resEntry = responseSpace[qIndex][l];
          if (resEntry.x === qResponse) {
            resEntry.y = resEntry.y + 1;
            // update meta data
            responseMeta[qIndex].totalAnswers =
              responseMeta[qIndex].totalAnswers + 1;
          }
        }
      }
    }
  }

  return (
    <Swiper id="main" navigation pagination spaceBetween={50} slidesPerView={1}>
      <SwiperSlide>
        <VictoryPie
          questionNumber={1}
          oriented={'vertical'}
          question={responseMeta[0].title}
          data={responseSpace[0]}
          totalAnswers={responseMeta[0].totalAnswers}
          legend={q1legend}
        />
      </SwiperSlide>
      <SwiperSlide>
        <VictoryPie
          questionNumber={2}
          oriented={'horizontal'}
          numItemsInRow={2}
          question={responseMeta[1].title}
          data={responseSpace[1]}
          totalAnswers={responseMeta[1].totalAnswers}
          legend={q2legend}
        />
      </SwiperSlide>
      <SwiperSlide>
        <VictoryGraph
          questionNumber={3}
          question={responseMeta[2].title}
          keys={responseSpace[2].map((e) => e.x)}
          data={responseSpace[2]}
          textLength={200}
        />
      </SwiperSlide>
      <SwiperSlide>
        <VictoryGraph
          questionNumber={4}
          question={responseMeta[3].title}
          keys={responseSpace[3].map((e) => e.x)}
          data={responseSpace[3]}
          textLength={200}
        />
      </SwiperSlide>
    </Swiper>
  );
};

/* View Results (Root) Component */
const ViewResultsPage = () => {
  const employeeQuery = useQuery(
    ['fetchData', { accessToken: auth.getAccessToken() }],
    fetchData
  );

  const meQuery = useQuery(
    ['fetchMe', { accessToken: auth.getAccessToken() }],
    fetchMe
  );

  document.title = 'Onward | View Results';

  return (
    <div>
      {meQuery.isLoading ? (
        <div>Loading...</div>
      ) : (meQuery.data as any).data.thresholdMet ? (
        <>
          {employeeQuery.isLoading ? (
            <div>Loading...</div>
          ) : (
            <>{employeeQuery.data && MyTable(employeeQuery.data as any)}</>
          )}
        </>
      ) : (
        Placeholder()
      )}
    </div>
  );
};

export default ViewResultsPage;
