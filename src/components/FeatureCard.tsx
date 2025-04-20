import { Sparkle } from 'lucide-react';

const FeatureCard = ({
  para,
  title,
}: {
  para: string;
  title: string;
}) => {
  return (
    <div className="bg-gradient-to-br from-[#1e1e2f] via-[#2b2b45] to-[#1a1a2a] rounded-2xl h-56 w-72 border border-white/10 backdrop-blur-lg p-5 flex flex-col justify-between transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-white/20 group">
      <div className="flex items-center gap-3">
        <Sparkle className="h-7 w-7 text-[#60a5fa] group-hover:text-[#38bdf8] drop-shadow-md transition-colors duration-200" />
        <h2 className="text-white text-lg font-bold group-hover:text-[#7dd3fc] transition-colors duration-200">
          {title}
        </h2>
      </div>
      <p className="text-gray-300 text-sm font-normal mt-4 line-clamp-4 leading-relaxed tracking-wide">
        {para}
      </p>
    </div>
  );
};

export default FeatureCard;
