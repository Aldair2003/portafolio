'use client';

/**
 * Sección de Contacto
 * 
 * Formulario de contacto usando EmailJS
 */

import { useState, FormEvent, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { sendContactEmail, initEmailJS } from '@/lib/email/contact';
import { FiMail, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = memo(function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Inicializar servicio (compatibilidad)
    initEmailJS();
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const result = await sendContactEmail(formData);
      setStatus({
        type: result.success ? 'success' : 'error',
        message: result.success ? t.contact.success : result.message || t.contact.error,
      });

      if (result.success) {
        // Limpiar formulario
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: t.contact.error,
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, t.contact]);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-bg-light/50 scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t.contact.title}
          </h2>
          <div className="w-24 h-1 bg-purple-600 dark:bg-purple-400 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-dark-bg-light rounded-xl shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t.contact.nameLabel}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-dark-bg-light text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={t.contact.namePlaceholder}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t.contact.emailLabel}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-dark-bg-light text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={t.contact.emailPlaceholder}
              />
            </div>

            {/* Mensaje */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t.contact.messageLabel}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder={t.contact.messagePlaceholder}
              />
            </div>

            {/* Status Message */}
            {status.type && (
              <div
                className={`flex items-center gap-2 p-4 rounded-lg ${
                  status.type === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                }`}
              >
                {status.type === 'success' ? (
                  <FiCheckCircle className="w-5 h-5" />
                ) : (
                  <FiAlertCircle className="w-5 h-5" />
                )}
                <p>{status.message}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  {t.contact.sending}
                </>
              ) : (
                <>
                  <FiSend className="w-5 h-5" />
                  {t.contact.sendButton}
                </>
              )}
            </button>
          </form>

          {/* Email Directo */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {t.contact.orDirect}
            </p>
            <a
              href="mailto:aldairtoala04@gmail.com"
              className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline"
            >
              <FiMail className="w-5 h-5" />
              aldairtoala04@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default Contact;

