import {Avatar, Col, Row} from "antd";
import {BlogCardSmall, YellowCard} from "@/components/business/blogCardSmall";
import Link from "next/link";
import {BlogCardBig} from "@/components/business/blogCardBig";

export  const BlogViewContent = () => {

    return (
        <div className="max-w-5xl mx-auto p-6 bg-background text-foreground">
            <h2 className="text-sm text-blue-500 mb-1">CATEGORY</h2>
            <h1 className="text-4xl  mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
            <div className="flex items-center mb-4 gap-2">
                <Avatar style={{backgroundColor:'#609734'}} src={'/person-1.png'}  size={"large"}/>
                <span className="text-sm">By Jordan Mitev</span>
                <span className="text-sm ">| Published on November 14, 2022</span>
                <span className="text-sm">| 2 min read</span>
            </div>
            <img src="https://www.escoffieronline.com/wp-content/uploads/2013/07/Oysters-garnished-with-red-caviar-on-salt-and-plate-1400.jpeg" alt="Delicious food" className="w-full rounded-lg mb-4"/>
            <Row >
                <Col span={18}>
                    <p className="mb-4 text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
                        Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultricies mauris. Maecenas
                        vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna
                        interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque
                        commodo lacus at sodales sodales.

                        Quisque sagittis orci id tincidunt condimentum, vel euismod erat placerat. In lacus eros, eget tempus
                        orci facilisis id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
                        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultricies
                        mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare
                        leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit
                        amet.
                    </p>
                    <h1 className="text-5xl font-semibold mb-4"> Lorem ipsum dolor sit amet,consectetur adipiscing elit.</h1>
                    <p className="mb-4 text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
                        Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultricies mauris. Maecenas
                        vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna
                        interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque
                        commodo lacus at sodales sodales.

                        Quisque sagittis orci id tincidunt condimentum, vel euismod erat placerat. In lacus eros, eget tempus
                        orci facilisis id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
                        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultricies
                        mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare
                        leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit
                        amet.
                    </p>
                    <p className="mb-4 text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
                        Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultricies mauris. Maecenas
                        vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna
                        interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque
                        commodo lacus at sodales sodales.

                        Quisque sagittis orci id tincidunt condimentum, vel euismod erat placerat. In lacus eros, eget tempus
                        orci facilisis id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
                        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultricies
                        mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare
                        leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit
                        amet.
                    </p>

                    {/*line*/}
                    <div className="w-full border-b-[1px] border-gray-30 my-12"></div>

                    <p className="mb-8 text-gray-600 text-[16px]">
                        Good or bad, we’d love to hear your thoughts. Find us on Twitter ({<Link className="text-blue-500" href={""}>@twitter</Link>})
                    </p>
                    <p className="mb-6 text-gray-600 font-semibold text-sm">
                        Here are some related articles you may find interesting
                    </p>
                    <BlogCardBig discription="Lorem ipsum dolor sit amet, consectetur adipiscing elit." major="Lorem ipsum dolor sit amet, consectetur adipiscing elit." title="Product" date="2 min ago" url = "https://www.escoffieronline.com/wp-content/uploads/2013/07/Oysters-garnished-with-red-caviar-on-salt-and-plate-1400.jpeg"/>
                    <BlogCardBig discription="Lorem ipsum dolor sit amet, consectetur adipiscing elit." major="Lorem ipsum dolor sit amet, consectetur adipiscing elit." title="Product" date="2 min ago" url = "https://www.escoffieronline.com/wp-content/uploads/2013/07/Oysters-garnished-with-red-caviar-on-salt-and-plate-1400.jpeg"/>
                    <BlogCardBig discription="Lorem ipsum dolor sit amet, consectetur adipiscing elit." major="Lorem ipsum dolor sit amet, consectetur adipiscing elit." title="Product" date="2 min ago" url = "https://www.escoffieronline.com/wp-content/uploads/2013/07/Oysters-garnished-with-red-caviar-on-salt-and-plate-1400.jpeg"/>
                    <BlogCardBig discription="Lorem ipsum dolor sit amet, consectetur adipiscing elit." major="Lorem ipsum dolor sit amet, consectetur adipiscing elit." title="Product" date="2 min ago" url = "https://www.escoffieronline.com/wp-content/uploads/2013/07/Oysters-garnished-with-red-caviar-on-salt-and-plate-1400.jpeg"/>


                </Col>
                <Col span={6}>
                    <p className="text-sm text-gray-800"> POPULAR POSTS</p>
                    <BlogCardSmall discription="Lorem ipsum dolor sit amet, consectetur adipiscing elit." title="Product" url = "https://www.escoffieronline.com/wp-content/uploads/2013/07/Oysters-garnished-with-red-caviar-on-salt-and-plate-1400.jpeg"/>
                    <BlogCardSmall discription="Lorem ipsum dolor sit amet, consectetur adipiscing elit." title="Product" url = "https://www.escoffieronline.com/wp-content/uploads/2013/07/Oysters-garnished-with-red-caviar-on-salt-and-plate-1400.jpeg"/>
                    <BlogCardSmall discription="Lorem ipsum dolor sit amet, consectetur adipiscing elit." title="Product" url = "https://www.escoffieronline.com/wp-content/uploads/2013/07/Oysters-garnished-with-red-caviar-on-salt-and-plate-1400.jpeg"/>
                    <BlogCardSmall discription="Lorem ipsum dolor sit amet, consectetur adipiscing elit." title="Product" url = "https://www.escoffieronline.com/wp-content/uploads/2013/07/Oysters-garnished-with-red-caviar-on-salt-and-plate-1400.jpeg"/>

                    <YellowCard/>
                </Col>

            </Row>





        </div>
    );
}