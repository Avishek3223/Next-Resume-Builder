import React from 'react';
import './Marketing.css'

function Marketing() {
  return (
    <div className='w-[60%] max1078:w-[90vw]'>
      <section class='py-12 mt-[10rem] max1078:mt-0'>
        <div class="container mx-auto px-4">
          <h2 class="text-[5rem] font-semibold text-gray-800 mb-4 rainbow-text-animation max767:text-[10vw] max767:text-center">Build Your Perfect Resume</h2>
          <p class="text-[1.8rem] text-[#c7c7c7] leading-relaxed max600:text-[5vw] max600:text-center">
            Create a standout resume that gets noticed by employers. Our easy-to-use builder guides you through the process, ensuring you highlight your skills and experience effectively.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Marketing;
