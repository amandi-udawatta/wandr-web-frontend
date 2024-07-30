import React, { useState } from 'react';
import { Skeleton } from 'antd';
import Image from 'next/image';

interface ImageWithSkeletonProps {
    src: string;
    alt: string;
    width: number;
    height: number;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({ src, alt, width, height }) => {
    const [loading, setLoading] = useState(true);

    return (
        <div style={{ position: 'relative', width, height }}>
            {loading && <Skeleton.Image active style={{ width, height }} />}
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                onLoadingComplete={() => setLoading(false)}
                style={loading ? { display: 'none' } : {}}
            />
        </div>
    );
};

export default ImageWithSkeleton;
