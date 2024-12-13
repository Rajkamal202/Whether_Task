import React from 'react';
import { Link } from 'react-router-dom';
import { Cloud, Sun, CheckCircle, ArrowRight, Calendar, BarChart3, Clock, Smartphone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-600 to-blue-700 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Smart Task Management Based on Weather
              </h1>
              <p className="text-xl text-blue-100">
                Plan your tasks intelligently with real-time weather insights. Never let weather surprise you again.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-black text-blue-600 hover:bg-blue-50">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/features">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob" />
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-white/5 p-4 rounded-lg">
                      <Sun className="h-8 w-8 text-yellow-400" />
                      <div className="text-sm">Outdoor Tasks</div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 p-4 rounded-lg">
                      <Cloud className="h-8 w-8 text-gray-300" />
                      <div className="text-sm">Indoor Tasks</div>
                    </div>
               
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Weather Task Manager?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our intelligent task management system helps you organize activities based on weather conditions, 
              ensuring optimal productivity and planning.
            </p>
          </div>
          <div className="relative">
              <img
                src="\landing.png"
                alt="MindfulMe App Interface"
                
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent rounded-lg p-4"></div>
            </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Calendar,
                title: "Smart Scheduling",
                description: "Automatically organize tasks based on weather forecasts"
              },
              {
                icon: BarChart3,
                title: "Weather Analytics",
                description: "Detailed weather insights for better planning"
              },
              {
                icon: Clock,
                title: "Real-time Updates",
                description: "Instant weather alerts and task recommendations"
              },
              {
                icon: Smartphone,
                title: "Mobile Friendly",
                description: "Access your tasks anywhere, anytime"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="rounded-lg p-3 bg-blue-100 w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
            <div className="space-y-12">
              {[
                {
                  step: "1",
                  title: "Create Your Task",
                  description: "Add your task details and location information"
                },
                {
                  step: "2",
                  title: "Get Weather Insights",
                  description: "We'll analyze the weather conditions for your task location"
                },
                {
                  step: "3",
                  title: "Smart Recommendations",
                  description: "Receive suggestions for the best time to complete your task"
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-violet-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their tasks smarter with weather-based insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-black text-blue-600 hover:bg-blue-50">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "This app has revolutionized how I plan my outdoor activities. The weather insights are incredibly accurate!",
                author: "Sarah Johnson",
                role: "Freelance Photographer"
              },
              {
                quote: "Perfect for construction project planning. We've saved countless hours by avoiding weather-related delays.",
                author: "Michael Chen",
                role: "Project Manager"
              },
              {
                quote: "The weather-based task suggestions are incredibly helpful. It's like having a personal assistant!",
                author: "Emma Davis",
                role: "Event Planner"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <p className="text-gray-600 mb-4">{testimonial.quote}</p>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Weather Task Manager</h3>
              <p className="text-sm">
                Smart task management based on real-time weather insights.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/features" className="hover:text-white">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/about" className="hover:text-white">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/documentation" className="hover:text-white">Documentation</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} Weather Task Manager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;



