import useSWR from 'swr';
import { Heading } from '@chakra-ui/layout';

import SiteTableSkeleton from '../../components/SiteTableSkeleton';
import DashboardShell from '../../components/DashboardShell';
import fetcher from '../../utils/fetcher';
import FeedbackTable from '../../components/FeedbackTable';
import { useAuth } from '../../lib/auth';

const Feedback = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <Heading m={2}>Your Feedbacks</Heading>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <Heading m={2}>Your Feedbacks</Heading>
      {data.feedback ? <FeedbackTable allFeedback={data.feedback} /> : null}
    </DashboardShell>
  );
};
export default Feedback;
