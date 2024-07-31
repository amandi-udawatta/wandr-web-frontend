// components/Testimonial.tsx
import { FC } from 'react';
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';

interface TestimonialProps {
  name: string;
  title: string;
  description: string;
  avatarUrl?: string;
}

const TestimonialCard: FC<TestimonialProps> = ({ name, title, description, avatarUrl }) => {
    return (
      <Card className="shadow-lg rounded-lg text-left p-4 max-w-96 transform transition duration-500 hover:scale-105 hover:shadow-xl">
        <div className="flex flex-col items-start">
          <Avatar
            className="mb-4"
            size={50}
            src={avatarUrl}
            icon={!avatarUrl ? <UserOutlined /> : undefined}
          />
          <div className="text-left mb-4">
            <p className="font-semibold text-lg">{name}</p>
            <p className="text-base text-gray-500">{title}</p>
          </div>
          <p className="text-gray-700 mt-2">{description}</p>
        </div>  
      </Card>
    );
  };

const Testimonial: FC = () => {
  const testimonials = [
    {
      name: 'John Cart',
      title: 'Owner of Culinary Delights',
      description: 'Wandr has been instrumental in getting the word out. The personalized recommendations ensure that our services are shown to users. Our bookings have increased, and we\'ve received excellent feedback from participants who found us through Wandr',
      avatarUrl:'/person-1.png'
    },
    {
      name: 'Louis Jabeth',
      title: 'Founder of Nature Treks',
      description: 'Wandr\'s platform has been a tremendous boost for our eco-tourism business. The integration of our services with the user\'s travel plans ensures that we are part of their journey from the start.',
      avatarUrl:'/person-2.png'
    },
    {
      name: 'Mary Doe',
      title: 'Marketing Director at Historic Tours Inc.',
      description: 'Wandr has helped us connect with history enthusiasts visiting our area. The ability to post detailed descriptions of our tours has drawn in more customers. The journaling feature also allows our customers to share their experiences, which acts as organic promotion for us.',
      avatarUrl:'/person-3.png'
    },
  ];

  return (
    <div className='mb-32'>
        <div className='flex flex-col justify-center'>
            <h2 className="text-5xl font-semibold mb-6 text-center">We are here to help</h2>
            <p className="text-md text-gray-30 mb-12 text-center">Know about our clients, we are a worldwide corporate brand</p>
        </div>
        
        <div className="relative flex justify-center text-center py-12">
            <div className="absolute flex justify-center inset-x-0 bottom-0 transform -translate-y-1/2 bg-green-35 h-[500px] w-[100%] top-[230px]"></div>
                <div className="relative">
                    <div className="flex justify-center space-x-4">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                    </div>
                </div>
        </div>
    </div>

  );
};

export default Testimonial;
