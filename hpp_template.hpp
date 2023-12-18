#ifndef __TEMPLATE_HPP__
#define __TEMPLATE_HPP__

#include <iostream>

/**
 * @brief TEMPLATE
 *
 */

namespace {

class TEMPLATE {
public:
  TEMPLATE();
  // rule of five
  ~TEMPLATE() = default; // destructor (virtual if TEMPLATE is meant to be a base class)
  TEMPLATE(const TEMPLATE &) = default;            // copy constructor
  TEMPLATE &operator=(const TEMPLATE &) = default; // copy assignment
  TEMPLATE(TEMPLATE &&) noexcept = default; // move constructor
  TEMPLATE &operator=(TEMPLATE &&) noexcept = default; // move assignment
};

} // namespace

#endif
