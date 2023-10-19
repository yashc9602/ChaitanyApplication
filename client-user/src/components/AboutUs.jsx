const AboutUsPage = () => {
  return (
    <div className="p-4 mt-16 bg-white">
      {/* Section 1: Our Story */}
      <div className="flex flex-row items-center space-x-4 h-[60vh]">
        <div className="flex-1 flex flex-row items-center justify-center rounded-lg overflow-hidden ">
          <img
            src="/src/assets/about_hero.svg"
            alt="Our Story"
            className="h-[60vh] rounded-lg"
          />
        </div>
        <div className="w-1/2 p-12">
          <h2 className="text-4xl font-bold mb-4">About Chaitanya Pathshala</h2>
          <p className="text-xl">
            Welcome to Chaitanya Pathshala, where education meets enlightenment.
            At Chaitanya Pathshala, we are committed to nurturing young minds
            and spirits through a diverse array of subjects that encompass both
            traditional wisdom and contemporary knowledge.
          </p>
        </div>
      </div>

      {/* Section 2: Vision, Mission, and Values */}
      <div className="flex flex-col space-y-8 m-8">
        <div className="flex flex-row space-x-8 mb-12">
          <div className="w-1/2">
            <div className="bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 p-6 rounded-lg shadow-lg h-[30vh]">
              <h3 className="text-3xl font-semibold mb-4 text-center text-white">
                Vision
              </h3>
              <p className="text-xl p-4 text-white">
                To be a premier educational institution that fosters holistic
                development, ignites intellectual curiosity, and cultivates
                compassionate, empowered individuals ready to make a positive
                impact on the world.
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <div className="bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 p-6 rounded-lg shadow-lg h-[30vh]">
              <h3 className="text-3xl font-semibold mb-4 text-center text-white">
                Mission
              </h3>
              <p className="text-lg p-4 text-white">
                At Chaitanya Pathshala, our mission is to provide a nurturing
                and diverse educational environment that equips students with
                the knowledge, skills, and values necessary to excel
                academically, embrace cultural heritage, and contribute
                meaningfully to society. We are committed to fostering a love
                for learning, instilling strong character, and promoting
                spiritual growth.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-5xl font-semibold text-center font-sans">Values</h3>
        <div className="flex flex-row space-x-4 ">
          <div className="w-1/5 ">
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg ">
              <h4 className="text-3xl font-semibold mb-4 font-sans ">Excellence</h4>
              <p className="text-lg">
                Striving for the highest standards in education and character.
              </p>
            </div>
          </div>
          <div className="w-1/5">
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
              <h4 className="text-3xl font-semibold mb-4 font-sans">
                Diversity and Inclusion
              </h4>
              <p className="text-lg">
                Celebrating differences and promoting inclusivity.
              </p>
            </div>
          </div>
          <div className="w-1/5">
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
              <h4 className="text-3xl font-semibold mb-4 font-sans">
                Character and Integrity
              </h4>
              <p className="text-lg">
                Upholding strong moral principles and honesty.
              </p>
            </div>
          </div>
          <div className="w-1/5">
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
              <h4 className="text-3xl font-semibold mb-4 font-sans">
                Cultural Preservation
              </h4>
              <p className="text-lg">
                Preserving and promoting cultural heritage.
              </p>
            </div>
          </div>
          <div className="w-1/5">
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
              <h4 className="text-3xl font-semibold mb-4 font-sans">Innovation</h4>
              <p className="text-lg">
                Encouraging creative and innovative thinking.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Founders */}
      <div className="m-12 ml-64 mr-64">
        <h2 className="text-5xl font-semibold mb-4 text-center mb-12 font-sans">Founders</h2>
        <div className="flex flex-row justify-center space-x-8">
          <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 mt-4 h-80 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
              <img src="/src/assets/hitankar_photo.png" alt="profile-picture" />
            </div>
            <div className="p-6 text-center">
              <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Hitankar Jain
              </h4>
              <p className="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
                CEO / Co-Founder
              </p>
            </div>
          </div>
          <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 mt-4 h-80 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
              <img src="/src/assets/shruti_photo.jpeg" alt="profile-picture" />
            </div>
            <div className="p-6 text-center">
              <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              Dr. Shruti Jain
              </h4>
              <p className="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
              MD and Co-founder
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
